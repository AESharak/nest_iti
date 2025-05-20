import { Injectable } from '@nestjs/common';
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

  getUserById(id: number, age: number): User | string {
    const user: User = this.users[id - 1];
    if (user.age === age) {
      return user;
    }

    return 'user not found';
  }

  deleteUser(id: number) {
    if (id < 0 || id > this.users.length) {
      return 'user not found';
    }

    this.users.splice(id - 1, 1);
    return 'user deleted successfully';
  }
}
