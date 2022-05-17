import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientMessage, ClientMessageDocument } from 'src/schemas/client-message.schema';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CreateClientMessageDto } from './dto/create-client-message.dto';

@Injectable()
export class ClientMessageService {

  constructor(@InjectModel(ClientMessage.name) private clientMessageModel: Model<ClientMessageDocument>) { }

  async add(createClientMessageDto: CreateClientMessageDto): Promise<ClientMessage> {
    const message = await new this.clientMessageModel(createClientMessageDto);
    return message.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.clientMessageModel.find().skip(pagination.page).limit(pagination.size).exec();
  }

  async remove(id: string) {
    return await this.clientMessageModel.deleteOne({ _id: id }).exec();
  }

}
