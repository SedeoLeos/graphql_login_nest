import { AuthenticationError } from "@nestjs/apollo";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext } from "@nestjs/graphql";
// import { I18nTranslations } from "src/generated/i18n.generated";
// import { I18nService } from "nestjs-i18n";
import { UserService } from "src/user/user.service";
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    // console.log(context.switchToHttp()['args'])
    // console.log(context.switchToHttp().getRequest())
    // console.log(context.switchToHttp())
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new AuthenticationError("Erro");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log(payload);
      const _user = await this.userService.findOne(
        payload.userId,
      );
      if (!_user) {
        throw new AuthenticationError("Erro");

      }
      const { password, ...user } = _user;
      request["user"] = user;


    } catch {
      throw new AuthenticationError("Erro");

    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers)
    const headers = request.headers as any;
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}