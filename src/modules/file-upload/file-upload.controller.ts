import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/jwt/jwt-auth.guard';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Public()
  @ApiOperation({ summary: 'ფაილის ატვირთვა მაგალითი' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
  
}
