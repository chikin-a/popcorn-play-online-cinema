import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: number;

  status: 'anons' | 'finish';

  @IsNotEmpty()
  genres: string[];

  @IsNotEmpty()
  country: string[];

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  views: number;

  @IsNotEmpty()
  duration: number;

  rating: number;

  @IsNotEmpty()
  posterUrl: string;

  @IsNotEmpty()
  bannerUrl: string;

  @IsNotEmpty()
  trailerUrl: string;
}
