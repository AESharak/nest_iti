import { IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'John Doe',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @ApiPropertyOptional({
    description: 'The age of the user',
    example: 25,
    minimum: 0,
    maximum: 150,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    description: 'The city of the user',
    example: 'cairo',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;
}
