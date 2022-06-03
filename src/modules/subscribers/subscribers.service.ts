import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriberDocument, Subscriber } from 'src/schemas/subscriber.schema';
import { CustomService } from 'src/utils/CustomService';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {

  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<SubscriberDocument>,
    private service: CustomService
  ) { }

  // TODO -- შეტყობინების დაბრუნება თუ უკვე გამოწერილი ყავს
  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const newSubscriber = await new this.subscriberModel(createSubscriberDto);
    return await newSubscriber.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.service.getPaginatedAll(this.subscriberModel, pagination);
  }

  async remove(id: string) {
    await this.service.findAndDelete(id, this.subscriberModel);
  }

}
