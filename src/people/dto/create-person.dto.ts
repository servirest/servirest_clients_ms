import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DocumentType } from '../enums/document_type.enum';

export class CreatePersonDto {
  @IsEnum(DocumentType)
  document_type: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  document: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  last_name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  phone_one: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  phone_two: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
