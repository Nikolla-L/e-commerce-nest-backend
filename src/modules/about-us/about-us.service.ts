import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs, AboutUsDocument } from 'src/schemas/about-us.schema';
import { CustomService } from 'src/utils/CustomService';
import { CustomValidation } from 'src/utils/CustomValidator';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@Injectable()
export class AboutUsService {

  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private validator: CustomValidation,
    private service: CustomService
  ) { }
  
  async create(createAboutUsDto: CreateAboutUsDto): Promise<AboutUs> {
    const newAboutUs = await new this.aboutUsModel(createAboutUsDto);
    return newAboutUs.save();
  }

  async findOne(id: string): Promise<any> {
    await this.validator.validateIdType(id);
    return await this.aboutUsModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateAboutUsDto: UpdateAboutUsDto) {
    await this.service.findAndUpdate(id, this.aboutUsModel, updateAboutUsDto);
  }

  async remove(id: string) {
    await this.service.findAndDelete(id, this.aboutUsModel);
  }
}
