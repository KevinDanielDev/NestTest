import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('sync')
  async syncMovies() {
    await this.moviesService.syncMovies();
    return 'Movies synced';
  }

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }
}
