import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const InitOpenApi = (app: INestApplication) => {
    const config = new DocumentBuilder()
            .setTitle('E-commerce api documentation')
            .setDescription('This is apis for e-commerce website')
            .setVersion('1.0')
			.addBearerAuth()
            .build();
    
    const document = SwaggerModule.createDocument(app, config); 
    SwaggerModule.setup('api-docs', app, document);
}
