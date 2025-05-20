import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): any[] {
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() user: User): string {
    return this.userService.addUser(user);
  }

  @Get(':id')
  getUserById(@Param('id') id: number, @Query('age') age: number): User {
    return this.userService.getUserById(+id, +age);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }
}
