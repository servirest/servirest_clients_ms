import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.resgister' })
  register(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @MessagePattern({ cmd: 'auth.login' })
  login(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @MessagePattern({ cmd: 'auth.verify' })
  verify(@Payload() token: string) {
    return this.authService.verify(token);
  }


}
