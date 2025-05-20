import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from './todo.type';

@Injectable()
export class TodoService {
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number) {
    if (!this.todos.some((t) => t.id === id)) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    return 'Todo added successfully';
  }

  deleteTodoById(id: number): string {
    if (!this.todos.some((t) => t.id === id)) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    this.todos = this.todos.filter((t) => t.id !== id);
    return 'Todo removed successfully';
  }

  editTodo(id: number, todo: Todo) {
    if (!this.todos.some((t) => t.id === id)) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    const currentTodoIdx = this.todos.findIndex((t) => t.id === id);

    this.todos[currentTodoIdx] = { ...todo, id };
    return 'todo Modified successfully';
  }
}
