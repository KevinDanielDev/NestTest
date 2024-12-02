import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ProviderModule } from 'src/provider/provider.module';
import { ProviderService } from 'src/provider/provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [ProviderModule, TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService, ProviderService],
})
export class MoviesModule {}
