import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {envs} from '../config';
import { JwtModule } from '@nestjs/jwt';
import { PeopleModule } from 'src/people/people.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[JwtModule.register({
    global: true,
    secret: envs.jwtSecret,
    signOptions: { expiresIn : '1h'}
  }),
PeopleModule]
})
export class AuthModule {}
