import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.type';

@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  addUser(user: any): string {
    this.users.push(user);
    return 'user has been added successfully';
  }

  getUserById(id: number, age: number): User {
    const user: User = this.users[id - 1];
    if (user.age === age) {
      return user;
    }

    // throw new NotFoundException('user not found');
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  deleteUser(id: number) {
    if (id < 0 || id > this.users.length) {
      throw new NotFoundException('user not found');
    }

    this.users.splice(id - 1, 1);
    return 'user deleted successfully';
  }
}
