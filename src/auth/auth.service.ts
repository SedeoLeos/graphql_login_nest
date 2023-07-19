import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService:UserService){}

  validate(email:string,password:string){
   const user = this.userService.findEmail(email)
   
  }
  sigin(input: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
