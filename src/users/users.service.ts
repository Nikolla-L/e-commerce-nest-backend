import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  
  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return user.save();
  }

  async findAll(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      id,
      {...updateUserDto, password: bcrypt.hash(updateUserDto.password, 10)},
      { useFindAndModify: false }
    ).exec();
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({_id: id}).exec();
  }
}
