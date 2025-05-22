import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
