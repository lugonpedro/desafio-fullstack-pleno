import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './@shared/prisma/prisma_exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS
  app.enableCors();

  // AUTO VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // EXCEPTION FILTER DECORATOR
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  // API
  const config = new DocumentBuilder()
    .setTitle('Classes API')
    .setDescription('description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // SIGINT e SIGTERM shutdowns
  app.enableShutdownHooks();

  await app.listen(process.env.PORT);

  const url = await app.getUrl();
  if (url.split(':')[0] === 'http') {
    console.log(`Application is running on: ${url}`);
    console.log(`Swagger is running on: ${url}/docs`);
  }
}
bootstrap();
