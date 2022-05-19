import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs, AboutUsDocument } from 'src/schemas/about-us.schema';
import { CustomValidation } from 'src/utils/CustomValidator';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@Injectable()
export class AboutUsService {

  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private validator: CustomValidation
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
    await this.validator.validateId(id, this.aboutUsModel);
    return await this.aboutUsModel.findByIdAndUpdate(id, {...updateAboutUsDto}, {useFindAndModify: false}).exec();
  }

  async remove(id: string) {
    await this.validator.validateId(id, this.aboutUsModel);
    return await this.aboutUsModel.deleteOne({_id: id}).exec();
  }
}
