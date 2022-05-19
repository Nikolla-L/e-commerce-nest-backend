import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberSchema } from 'src/schemas/subscriber.schema';
import { CustomValidation } from 'src/utils/CustomValidator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subscriber', schema: SubscriberSchema }])],
  controllers: [SubscribersController],
  providers: [SubscribersService, CustomValidation]
})
export class SubscribersModule {}
