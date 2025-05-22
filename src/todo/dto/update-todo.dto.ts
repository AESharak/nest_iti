import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { status } from '../todo.type';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  task?: string;

  @IsOptional()
  @IsEnum(status)
  status?: status;

  @IsOptional()
  @IsNumber()
  id?: number;
}
