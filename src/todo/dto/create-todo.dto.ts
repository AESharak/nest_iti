import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { status } from '../todo.type';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  task: string;

  @IsNotEmpty()
  @IsEnum(status)
  status: status;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
