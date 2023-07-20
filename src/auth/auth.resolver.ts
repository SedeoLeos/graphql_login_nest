import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { Public } from './guard/auth.guard';

@Public()
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => Auth)
  async login(@Args('createAuthInput') authInput: CreateAuthInput,@Context('req')req:Request) {
   
    return await this.authService.login(authInput, req.headers["user-agent"]);
  }

  @Mutation(() => Auth)
  async sigin(@Args('registerInput') authInput: CreateUserInput,@Context('req')req:Request) {
    return await this.authService.sigin(authInput,req.headers["user-agent"]);
  }

  @Mutation(() => Auth)
  async refresh(@Args('refreshInput') authInput: CreateUserInput,@Context('req')req:Request) {
    return await this.authService.sigin(authInput,req.headers["user-agent"]);
  }


}
