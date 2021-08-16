import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
   whitelist: true, // It allows to return only the corresponding data, if another parameter is sent, it does not return it.
   forbidNonWhitelisted: true, //allows to return message error to data no corresponding. 
  }));
  await app.listen(3000);
}
bootstrap();
