import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
