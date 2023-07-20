import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  // listUser: Array<User> = [];

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>){}
  async create(partial: CreateUserInput) {
    const password = await this.passwordHash(partial.password)  
    return await this.userRepository.save({ ...partial, password: password });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await  this.userRepository.findOne({where:{id}});
  }
  async findEmail(email: string) {
    await (await this.userRepository.find()).map((user)=>{

      console.log(user) 
    })
    return await this.userRepository.findOne({where:{email}});
  }

  async update(id: number, partial: UpdateUserInput) {
    return await this.userRepository.save({...partial,id:id})
  }

  async remove(id: number) {
    
    return await this.userRepository.delete({id});
  }

  async comparePassword(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted)
  }
  async passwordHash(buffer: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(buffer, salt)

  }
}
