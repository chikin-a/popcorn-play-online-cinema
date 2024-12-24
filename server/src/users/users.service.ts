import * as bcrypt from 'bcrypt';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { multicast } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user._id };
    }
    return 'Invalid credentials';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const candidate = await this.userModel.findOne({
    //   email: createUserDto.email,
    // });
    //
    // if (candidate) {
    //   return '';
    // }
    const { username, email, password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 8);
    return this.userModel.create({ username, email, password: hashPassword });
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, createUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
