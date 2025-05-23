import { ApiProperty } from '@nestjs/swagger';
import { status } from '../todo.type';

export class TodoResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: 'Complete the project documentation' })
  task: string;

  @ApiProperty({ enum: status, example: status.TODO })
  status: status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
