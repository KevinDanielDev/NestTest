import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';

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

  @Get(':id')
  @UseGuards(AuthGuard())
  getMovieById(@Param('id') id: number) {
    return this.moviesService.getMovieById(id);
  }
}
