import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {envs} from '../config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[JwtModule.register({
    global: true,
    secret: envs.jwtSecret,
    signOptions: { expiresIn : '1h'}
  })]
})
export class AuthModule {}
