import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { RefreshService } from './refresh.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refresh } from './entities/refresh.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Auth0Guard } from './guard/auth.guard';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const option = {
          secret: process.env.ACCESS_SECRET,
          signOptions: { expiresIn: '10h' }
        }
        return option

      }
    }),

    TypeOrmModule.forFeature([Refresh]),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: Auth0Guard,
  },
    AuthResolver, AuthService, RefreshService]
})
export class AuthModule { }
