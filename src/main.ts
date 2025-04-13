import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin: process.env.allowedOrigins?.split(',') ?? ['http://localhost:3000'],
    }
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('OXXO API')
    .setDescription('API for OXXO Management')
    .setVersion('0.9')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted : true,
    transform : true
  }));
    
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
