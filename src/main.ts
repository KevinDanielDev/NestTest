import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3001;
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Prefijo para todasd las rutas
  app.useGlobalPipes(
    // Validacion de datos
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
  });
  await app.listen(PORT);
  logger.log(`Servidor corriendo en localhost:${PORT} `);
  logger.log(`Ambiente: ${process.env.NODE_ENV}`);
}
bootstrap();
