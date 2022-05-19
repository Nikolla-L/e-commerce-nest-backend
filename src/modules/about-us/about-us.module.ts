import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { AboutUsSchema } from 'src/schemas/about-us.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomValidation } from 'src/utils/CustomValidator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'AboutUs', schema: AboutUsSchema }])],
  controllers: [AboutUsController],
  providers: [AboutUsService, CustomValidation]
})
export class AboutUsModule {}
