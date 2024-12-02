import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNumber()
  id: number;

  @IsString()
  backdrop_path: string;

  @IsNumber()
  @IsArray()
  genre_ids: number[];

  @IsString()
  original_language: string;

  @IsString()
  original_title: string;

  @IsString()
  overview: string;

  @IsNumber()
  popularity: number;

  @IsString()
  poster_path: string;

  @IsString()
  release_date: string;

  @IsString()
  title: string;

  @IsNumber()
  vote_average: number;

  @IsNumber()
  vote_count: number;
}
