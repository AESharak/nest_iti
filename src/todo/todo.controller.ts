import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.type';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll(): Todo[] {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: number): Todo | undefined {
    return this.todoService.getTodoById(+id);
  }

  @Post()
  addTodo(@Body() todo: Todo): string {
    return this.todoService.addTodo(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodoById(+id);
  }

  @Put(':id')
  editTodo(@Param('id') id: number, @Body() todo: Todo) {
    return this.todoService.editTodo(+id, todo);
  }
}
