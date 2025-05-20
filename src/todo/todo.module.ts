import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoCreated } from '../middlewares/todoCreated.middleware';

@Module({
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
