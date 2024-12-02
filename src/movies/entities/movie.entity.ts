import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryColumn('int', {
    unique: true,
  })
  id: number;

  @Column('text')
  backdrop_path: string;

  @Column({ type: 'simple-json' })
  genre_ids: number[];

  @Column('text')
  original_language: string;

  @Column('text')
  original_title: string;

  @Column('text')
  overview: string;

  @Column('int')
  popularity: number;

  @Column('text')
  poster_path: string;

  @Column('text')
  release_date: string;

  @Column('text')
  title: string;

  @Column('float')
  vote_average: number;

  @Column('float')
  vote_count: number;
}
