import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriberDocument, Subscriber } from 'src/schemas/subscriber.schema';
import { CustomValidation } from 'src/utils/CustomValidator';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
@Injectable()
export class SubscribersService {

  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<SubscriberDocument>,
    private validator: CustomValidation
  ) { }

  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const newSubscriber = await new this.subscriberModel(createSubscriberDto);
    return await newSubscriber.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.subscriberModel.find().skip(pagination.page).limit(pagination.size).exec();
  }

  async remove(id: string) {
    await this.validator.validateId(id, this.subscriberModel);
    return await this.subscriberModel.deleteOne({_id: id}).exec();
  }

}
