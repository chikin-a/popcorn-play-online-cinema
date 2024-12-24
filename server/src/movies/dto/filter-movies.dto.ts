export class FilterMoviesDto {
  title?: string;
  year?: number;
  status?: 'anons' | 'finish';
  genres?: string;
  country?: string;
  sort?: string;
}
