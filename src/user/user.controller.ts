import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.type';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    await this.userService.getUsers();
  }
}

// @Get()
// getAll(): User[] {
//   return this.userService.getUsers();
// }

// @Post()
// addUser(@Body() user: CreateUserDto): string {
//   return this.userService.addUser(user);
// }

// @Get(':id')
// getUserById(
//   @Param('id', ParseIntPipe) id: number,
//   @Query('age', ParseIntPipe) age: number,
// ): User {
//   return this.userService.getUserById(id, age);
// }

// @Delete(':id')
// deleteUser(@Param('id', ParseIntPipe) id: number) {
//   return this.userService.deleteUser(id);
// }
