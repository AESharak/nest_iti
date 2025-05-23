import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async getTodos(query: TodoQueryDto) {
    const { skip = 0, limit = 10, search, status } = query;

    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.task = { $regex: search, $options: 'i' };
    }

    try {
      const [todos, total] = await Promise.all([
        this.todoModel
          .find(filter)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec(),
        this.todoModel.countDocuments(filter).exec(),
      ]);

      return {
        data: todos,
        total,
        skip,
        limit,
        hasMore: skip + limit < total,
      };
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new HttpException(
        'Failed to fetch todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTodoById(id: string) {
    try {
      const todo = await this.todoModel.findById(id);
      if (!todo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return todo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }

  async addTodo(todo: CreateTodoDto) {
    try {
      console.log(todo);
      const newTodo = await this.todoModel.create(todo);
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw new HttpException(
        'Failed to add todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTodoById(id: string) {
    try {
      const result = await this.todoModel.findByIdAndDelete(id);
      if (!result) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Todo removed successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }

  async editTodo(id: string, todoUpdate: UpdateTodoDto) {
    try {
      const updatedTodo = await this.todoModel.findByIdAndUpdate(
        id,
        todoUpdate,
        { new: true },
      );

      if (!updatedTodo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }

      return updatedTodo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }
}
