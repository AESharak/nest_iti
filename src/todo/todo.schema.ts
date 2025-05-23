import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { status } from './todo.type';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, trim: true, minlength: 10 })
  task: string;

  @Prop({ required: true, enum: status, default: status.TODO })
  status: status;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
