import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const InitOpenApi = (app: INestApplication) => {
    const config = new DocumentBuilder()
            .setTitle('E-commerce api documentation')
            .setDescription('This is apis doc for e-commerce website')
            .setVersion('1.0')
			.addBearerAuth()
            .build();
    
    const document = SwaggerModule.createDocument(app, config); 
    SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'E-commerce API Docs',
        customCss: ` body {height: 100vh; background: linear-gradient(to left, #5aa5d8, #7df6e6, #ffffff)}
                    .swagger-ui .info .title {font-family: monospace; color: rgb(159, 0, 222)}
                    .swagger-ui { background-color: rgba(34, 34, 34, 0.02); color: #fff }`
    });
}
