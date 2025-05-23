import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { Todo } from '../todo/todo.schema';
import { status } from '../todo/todo.type';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      await this.seed();
    }
  }

  async seed() {
    try {
      // Check if data already exists
      const userCount = await this.userModel.countDocuments();
      const todoCount = await this.todoModel.countDocuments();

      if (userCount > 0 || todoCount > 0) {
        this.logger.log('Database already contains data, skipping seed');
        return;
      }

      // Seed users
      const users = await this.userModel.insertMany([
        { name: 'Ahmed Essam', age: 25, city: 'Cairo' },
        { name: 'John Doe', age: 30, city: 'Alexandria' },
        { name: 'Jane Smith', age: 28, city: 'Giza' },
        { name: 'Mohamed Ali', age: 32, city: 'Cairo' },
        { name: 'Sarah Johnson', age: 27, city: 'Luxor' },
      ]);

      // Seed todos
      const todos = await this.todoModel.insertMany([
        {
          task: 'Complete NestJS project documentation',
          status: status.IN_PROGRESS,
        },
        {
          task: 'Implement user authentication system',
          status: status.TODO,
        },
        {
          task: 'Write comprehensive unit tests',
          status: status.TODO,
        },
        {
          task: 'Setup CI/CD pipeline for deployment',
          status: status.DONE,
        },
        {
          task: 'Optimize database queries for better performance',
          status: status.TODO,
        },
        {
          task: 'Create API documentation with Swagger',
          status: status.DONE,
        },
        {
          task: 'Implement error handling and logging',
          status: status.IN_PROGRESS,
        },
      ]);

      this.logger.log(`Seeded ${users.length} users and ${todos.length} todos`);
    } catch (error) {
      this.logger.error('Error seeding database:', error);
    }
  }

  async clearDatabase() {
    try {
      await Promise.all([
        this.userModel.deleteMany({}),
        this.todoModel.deleteMany({}),
      ]);
      this.logger.log('Database cleared successfully');
    } catch (error) {
      this.logger.error('Error clearing database:', error);
    }
  }
}
