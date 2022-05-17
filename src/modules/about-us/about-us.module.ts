import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { AboutUsSchema } from 'src/schemas/about-us.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'AboutUs', schema: AboutUsSchema }])],
  controllers: [AboutUsController],
  providers: [AboutUsService]
})
export class AboutUsModule {}
