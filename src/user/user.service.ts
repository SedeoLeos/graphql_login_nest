import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  listUser: Array<User> = [];
  async create(partial: CreateUserInput) {
    const password = await this.passwordHash(partial.password)
    const user = new User({ ...partial, password: password })
    this.listUser.push(user)
    return user;
  }

  findAll() {
    return this.listUser;
  }

  findOne(id: number) {
    return this.listUser.find((user) => user.id === id);
  }
  findEmail(email: string) {
    return this.listUser.find((user) => user.email === email);
  }

  update(id: number, partial: UpdateUserInput) {
    this.listUser.map((user) => {
      if (user.id === id) {
        return new User({ ...user, ...partial })
      }
      return user;
    })
    return this.listUser.find((user) => user.id === id);
  }

  remove(id: number) {
    const userDelete = this.findOne(id)
    const restList = this.listUser.filter((user) => user.id !== id)
    this.listUser = restList;
    return userDelete;
  }

  async comparePassword(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted)
  }
  async passwordHash(buffer: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(buffer, salt)

  }
}
