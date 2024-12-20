import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { MoviesModule } from './movies/movies.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development')
          .required(),
        PORT: Joi.number().port().default(3001).required(),
        JWT_SECRET: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 5000,
    }),
    AuthModule,
    ProviderModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
