import { Module } from '@nestjs/common';
import { ClientMessageService } from './client-message.service';
import { ClientMessageController } from './client-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientMessageSchema } from 'src/schemas/client-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ClientMessage', schema: ClientMessageSchema }])
  ],
  controllers: [ClientMessageController],
  providers: [ClientMessageService]
})
export class ClientMessageModule {}
