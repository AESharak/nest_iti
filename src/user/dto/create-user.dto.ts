import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 25,
    minimum: 0,
    maximum: 150,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
