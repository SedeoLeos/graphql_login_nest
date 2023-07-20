import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Refresh } from './entities/refresh.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'jsonwebtoken';

@Injectable()
export class RefreshService {

  constructor(
    @InjectRepository(Refresh)
    private refreshRepository: Repository<Refresh>,
    private jwtService: JwtService) { }

  async create(user: User,
    userAgent: string): Promise<{
      Access_Token: string;
      Refresh_Token: string,
      Scope: string
      Access_Duretion: string
      Refresh_Duretion: string
    }> {
    const createRefresh = this.refreshRepository.create({ user, userAgent })
    const saveRefresh = await this.refreshRepository.save(createRefresh)
    return {
      Scope: 'user',
      Access_Duretion: '10h',
      Refresh_Duretion: '30J',
      Refresh_Token: saveRefresh.sign,
      Access_Token: this.jwtService.sign(
        {
          userId: user.id,
          email: user.email,
        }),
    };
  }

  async removeToken(id: number) {
    const remove = await this.refreshRepository.delete({ id: id, })
  }

  async findOne(refreshStr: string, userAgent: string = "Default"): Promise<Refresh | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET,);


      if (typeof decoded === 'string') {
        console.log(typeof decoded === 'string')
        return undefined;
      }
      const refresh = await this.refreshRepository.findOne({ where: { id: 1, userAgent: decoded.userAgent }, relations: { user: true } })
      if (!refresh) {
        console.log(refresh)
        return undefined;
      }

      if (userAgent === decoded.userAgent) {
        return refresh;
      }
      return undefined
    } catch (e) {
      console.log("+++++++++++++++++", e)
      return undefined;
    }
  }
  async remove(refresh: Refresh) {

    return await this.refreshRepository.delete({ id: refresh.id })
  }
}
