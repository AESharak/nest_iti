import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
// private users: User[];

// constructor() {
//   this.users = [];
// }

// getUsers() {
//   return this.users;
// }

// addUser(user: CreateUserDto): string {
//   this.users.push({ ...user, city: 'cairo' });
//   return 'user has been added successfully';
// }

// getUserById(id: number, age: number): User {
//   const user: User = this.users[id - 1];
//   if (user.age === age) {
//     return user;
//   }

//   // throw new NotFoundException('user not found');
//   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
// }

// deleteUser(id: number) {
//   if (id < 0 || id > this.users.length) {
//     throw new NotFoundException('user not found');
//   }

//   this.users.splice(id - 1, 1);
//   return 'user deleted successfully';
// }
