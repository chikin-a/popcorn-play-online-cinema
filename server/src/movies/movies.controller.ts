import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getFilteredMovies(@Query() query: FilterMoviesDto): Promise<Movie[]> {
    return this.movieService.getFilteredMovies(query);
  }

  @Get('random')
  async getRandom(): Promise<Movie> {
    return this.movieService.random();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.getById(id);
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Movie> {
    return this.movieService.remove(id);
  }
}
