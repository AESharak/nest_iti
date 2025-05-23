import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all todos with optional filtering and pagination',
  })
  @ApiResponse({ status: 200, description: 'Return paginated todos.' })
  getAll(@Query() query: TodoQueryDto) {
    return this.todoService.getTodos(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Return the todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  getTodo(@Param('id', ParseObjectIdPipe) id: string) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  addTodo(@Body() todo: CreateTodoDto) {
    return this.todoService.addTodo(todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  editTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todoService.editTodo(id, todo);
  }
}
