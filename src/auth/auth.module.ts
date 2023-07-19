import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({
    secret:process.env.ACCESS_SECRET,
    signOptions: { expiresIn: '10h' },

  })],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
