import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('BASE_URL'),
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${configService.get('API_JWT_TOKEN')}`,
        },
      }),
    }),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
