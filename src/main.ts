import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3001;
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  logger.log(`Servidor corriendo en localhost:${PORT} `);
  logger.log(`Ambiente: ${process.env.NODE_ENV}`);
}
bootstrap();
