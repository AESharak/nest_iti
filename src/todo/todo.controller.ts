import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() todo: CreateTodoDto) {
    return this.todoService.addTodo(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }

  @Put(':id')
  editTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todoService.editTodo(id, todo);
  }
}
