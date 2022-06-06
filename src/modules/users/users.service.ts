import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CustomService } from 'src/utils/CustomService';

@Injectable()
export class UsersService implements OnModuleInit {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private service: CustomService
  ) { }

  async onModuleInit() {
    await this.seedAdmin()
  }
  
  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return user.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.service.getPaginatedAll(this.userModel, pagination);
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({_id: id}).exec();
  }

  async findWithUsername(username: string): Promise<any> {
    return await this.userModel.findOne({username: username}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      id,
      {...updateUserDto, password: bcrypt.hash(updateUserDto.password, 10)},
      { useFindAndModify: false }
    ).exec();
  }

  async delete(id: string) {
    await this.service.findAndDelete(id, this.userModel);
  }

  async seedAdmin() {
    const adminExists = await this.userModel.find({isAdmin: true}).exec();
    if(adminExists?.length == 0) {
      await this.userModel.create({
        username: 'Admin',
        firstname: 'admin',
        lastname: 'adminishvili',
        phone: '555555555',
        email: 'email@ecomerce.corp.ge',
        password: 'admin123',
        isAdmin: true
      });
    } else {
      console.log('admin alreade seeded');
    }
  }
}
