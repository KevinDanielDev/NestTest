import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const PORT = process.env.PORT ?? 3001;
  await app.listen(PORT);
  logger.log(`Servidor corriendo en localhost:${PORT} `);
  logger.log(`Ambiente: ${process.env.NODE_ENV}`);
}
bootstrap();
