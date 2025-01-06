import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @MinLength(7)
  @MaxLength(11)
  document : string;

  @IsEmail()
  @IsString()
  email:string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password:string;
}
