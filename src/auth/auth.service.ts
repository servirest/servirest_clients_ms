import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async register(registerUserDto: RegisterUserDto) {
    return { registerUserDto };
  }

  async login(loginUserDto: LoginUserDto) {
    return { loginUserDto };
  }

  async verify(token: string) {
    try {
      const {
        sub: _,
        iat__,
        exp: ___,
        ...user
      } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      return {
        user: user,
        token: token,
      };
    } catch (error) {
      throw new RpcException({ estatus: 400, message: 'Invalid token' });
    }
  }

  singJwt(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }
}
