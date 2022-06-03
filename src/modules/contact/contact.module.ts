import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from 'src/schemas/contact.schema';
import { CustomService } from 'src/utils/CustomService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
  controllers: [ContactController],
  providers: [ContactService, CustomService]
})
export class ContactModule {}
