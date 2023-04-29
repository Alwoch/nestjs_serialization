import { IsNotEmpty, IsString, IsDateString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsDateString({ strict: true })
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
