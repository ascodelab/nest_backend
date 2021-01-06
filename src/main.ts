import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('/api/v1');
  //enable cross site acccess
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST',
    preflightContinue: false,
  });
  //listen the app
  await app.listen(port);
  const appUri = await app.getUrl();
  process.env.BASE_URL = appUri + '/';
  Logger.log(`Server Started on URI : ${process.env.BASE_URL}`);
  Logger.log(`Server Started on PORT : ${port}`);
}
bootstrap();
