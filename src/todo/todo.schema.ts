import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { status } from './todo.type';

@Schema()
export class Todo {
  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true, enum: status })
  status: status;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
