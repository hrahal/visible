import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/utils/http-exception.filter';

function addSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Project Management Api')
    .setDescription('The Project Management API ')
    .setVersion('1.0')
    .addTag('Visible')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  addSwagger(app)
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
