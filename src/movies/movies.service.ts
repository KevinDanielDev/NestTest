import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProviderService } from 'src/provider/provider.service';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataMovie } from './interfaces/data.movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    private readonly providerService: ProviderService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // Método para sincronizar las películas de la API con la base de datos
  async syncMovies() {
    try {
      const allMovies = await this.providerService.getMovies();

      if (allMovies.length === 0) {
        throw new InternalServerErrorException(
          'No movies found in API response',
        );
      }

      // Transformar la respuesta de la API a un formato que se pueda guardar en la base de datos
      const tranformedMovies = allMovies.results.map((movie: IDataMovie) => {
        return {
          id: movie.id,
          backdrop_path: movie.backdrop_path,
          genre_ids: movie.genre_ids,
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        };
      });
      await this.movieRepository.save(tranformedMovies);
    } catch (error) {
      if (error) throw new InternalServerErrorException('Error syncing movies');
    }
  }

  async getAllMovies() {
    const allMovies = await this.movieRepository.find();
    if (allMovies.length === 0)
      throw new InternalServerErrorException('No movies found in database');
    return allMovies;
  }
}
