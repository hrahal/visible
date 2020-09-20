import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/utils/http-exception.filter';
import { INestApplication } from '@nestjs/common';

function addSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Project Management Api')
    .setDescription('The Project Management API ')
    .setVersion('1.0')
    .addTag('Visible')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

/**
 * Initialize the application + add swagger and middleware
 */
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  addSwagger(app)
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
