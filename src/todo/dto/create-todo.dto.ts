import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { status } from '../todo.type';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The task description',
    example: 'Complete the NestJS project documentation',
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  task: string;

  @ApiProperty({
    description: 'The status of the todo',
    enum: status,
    example: status.TODO,
  })
  @IsNotEmpty()
  @IsEnum(status)
  status: status;
}
