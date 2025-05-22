import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-lab'),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes('users');
  // }
}
