import { Module } from '@nestjs/common';
import { ClientMessageService } from './client-message.service';
import { ClientMessageController } from './client-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientMessageSchema } from 'src/schemas/client-message.schema';
import { CustomService } from 'src/utils/CustomService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ClientMessage', schema: ClientMessageSchema }])
  ],
  controllers: [ClientMessageController],
  providers: [ClientMessageService, CustomService]
})
export class ClientMessageModule {}
