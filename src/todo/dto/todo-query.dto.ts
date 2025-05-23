import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { status } from '../todo.type';

export class TodoQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter todos by status',
    enum: status,
  })
  @IsOptional()
  @IsEnum(status)
  status?: status;
}
