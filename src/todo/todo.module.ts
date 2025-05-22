import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoCreated } from '../middlewares/todoCreated.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TodoCreated)
      .forRoutes({ path: 'todos', method: RequestMethod.POST });
  }
}
