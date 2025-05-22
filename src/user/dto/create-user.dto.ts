import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
