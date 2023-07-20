import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { RefreshService } from './refresh.service';
import { AuthenticationError } from '@nestjs/apollo';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private refreshService: RefreshService) { }

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.userService.findEmail(email)
    if (!user) {
      return null;
    }
    const completed = await this.userService.comparePassword(password, user.password)
    if (!completed) {
      console.log("%c stype='background-color:red'")
      return null;
    }
    return user;

  }
  async login(input: CreateAuthInput, userAgent: string) {
    console.log(input.password)
    const user = await this.validate(input.email, input.password)
    if (!user) {
      throw new AuthenticationError("Echec d'authentification")
    }
    return await this.refreshService.create(user, userAgent);
  }

  async sigin(input: CreateUserInput, userAgent: string) {
    const user =await this.userService.create(input)
    return await this.refreshService.create(user, userAgent);
  }


}
