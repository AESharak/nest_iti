import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(query: UserQueryDto = {}): Promise<any> {
    const { skip = 0, limit = 10, search, city } = query;

    const filter: Record<string, any> = {};

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    try {
      const [users, total] = await Promise.all([
        this.userModel
          .find(filter)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec(),
        this.userModel.countDocuments(filter).exec(),
      ]);

      return {
        data: users,
        total,
        skip,
        limit,
        hasMore: skip + limit < total,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel({
        ...createUserDto,
        city: 'cairo', // Default city as per the commented code
      });
      return await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { $set: updateUserDto },
          {
            new: true,
          },
        )
        .exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }
}
// private users: User[];

// constructor() {
//   this.users = [];
// }

// getUsers() {
//   return this.users;
// }

// addUser(user: CreateUserDto): string {
//   this.users.push({ ...user, city: 'cairo' });
//   return 'user has been added successfully';
// }

// getUserById(id: number, age: number): User {
//   const user: User = this.users[id - 1];
//   if (user.age === age) {
//     return user;
//   }

//   // throw new NotFoundException('user not found');
//   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
// }

// deleteUser(id: number) {
//   if (id < 0 || id > this.users.length) {
//     throw new NotFoundException('user not found');
//   }

//   this.users.splice(id - 1, 1);
//   return 'user deleted successfully';
// }
