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
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    return 'Todo added successfully';
  }

  deleteTodoById(id: number): string {
    const beforeTodosDeletionLength = this.todos.length;
    this.todos = this.todos.filter((t) => t.id !== id);
    if (beforeTodosDeletionLength === this.todos.length) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return 'Todo removed successfully';
  }

  editTodo(id: number, todo: Todo) {
    const currentTodo: Todo | undefined = this.todos.find((t) => t.id === id);

    if (!currentTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    currentTodo.id = id;
    currentTodo.status = todo.status;
    currentTodo.task = todo.task;

    return 'todo Modified successfully';
  }
}
