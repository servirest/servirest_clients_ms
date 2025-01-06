import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { PeopleService } from 'src/people/people.service';
import bcryip from 'bcrypt';
import { Person } from 'src/people/entities/person.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly peopleService: PeopleService,
  ) {}

  async register({ document, email, password }: RegisterUserDto) {
    const person = await this.peopleService.findOneByDocument(document);

    if (person) {
      const isValidUser = await this.validateUser(person, email);
      if (isValidUser) {
        return { isAlreadyRegistered: true, person };
      } else {
        throw new RpcException({
          status: 400,
          message: `${document} is already registered but email does not match`,
        });
      }
    }

    return { document, email, password };
  }

  async validateUser(person: Person, email: string): Promise<boolean> {
    const hasPassword = await this.hasPassword(person);
    const hasEmail = await this.hasEmail(person);

    if (hasPassword && hasEmail) {
      throw new RpcException({
        status: 400,
        message: `${person.email} is already registered`,
      });
    }

    return person.email === email;
  }

  async hasPassword(person: Person): Promise<boolean> {
    return this.isNotEmpty(person?.password);
  }

  async hasEmail(person: Person): Promise<boolean> {
    return this.isNotEmpty(person?.email);
  }

  async isNotEmpty(field: string | null | undefined): Promise<boolean> {
    return field !== null && field !== undefined && field !== '';
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
