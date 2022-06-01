import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { InitOpenApi } from './config/Swagger';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }]
  });

  InitOpenApi(app);

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();