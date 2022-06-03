import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { AboutUsSchema } from 'src/schemas/about-us.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomValidation } from 'src/utils/CustomValidator';
import { CustomService } from 'src/utils/CustomService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'AboutUs', schema: AboutUsSchema }])],
  controllers: [AboutUsController],
  providers: [
    AboutUsService,
    CustomValidation,
    CustomService
  ]
})
export class AboutUsModule {}
