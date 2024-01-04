import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Books Management')
    .setDescription('The Books Management API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  app.enableCors(
    {
      origin: '*'
    }
  );

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();