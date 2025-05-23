import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, maxlength: 20 })
  name: string;

  @Prop({ required: true, min: 0, max: 150 })
  age: number;

  @Prop({ default: 'cairo', trim: true, maxlength: 50 })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
