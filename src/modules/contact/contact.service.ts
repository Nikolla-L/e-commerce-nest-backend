import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from 'src/schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {

  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) { }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const newContact = await new this.contactModel(createContactDto);
    return newContact.save();
  }

  async findAll(): Promise<any> {
    return await this.contactModel.find().exec();
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.contactModel.findByIdAndUpdate(id, {...updateContactDto}, { useFindAndModify: false }).exec();
  }

  async remove(id: string) {
    return await this.contactModel.deleteOne({_id: id}).exec();
  }
}
