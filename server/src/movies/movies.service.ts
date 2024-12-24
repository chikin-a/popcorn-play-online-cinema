import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getFilteredMovies(query: FilterMoviesDto): Promise<Movie[]> {
    const filter: any = {};

    if (query.title) filter.title = { $regex: query.title, $options: 'i' };
    if (query.year) filter.year = +query.year;
    if (query.status) filter.status = query.status;
    if (query.country) {
      const countryArray = query.country.split(',');
      if (countryArray.length === 1) {
        filter.country = countryArray[0];
      } else filter.country = { $in: countryArray };
    }
    if (query.genres) {
      const genresArray = query.genres.split(',');
      if (genresArray.length === 1) {
        filter.genres = genresArray[0];
      } else filter.genres = { $in: genresArray };
    }

    let sort: any = {};
    if (query.sort) {
      const sortField = query.sort.split(':')[0];
      const sortOrder = query.sort.split(':')[1] === 'desc' ? -1 : 1;
      sort = { [sortField]: sortOrder };
    }

    return this.movieModel.find(filter).sort(sort).exec();
  }

  async getById(id: string): Promise<Movie> {
    return this.movieModel.findById(id);
  }

  async random(): Promise<Movie> {
    const randomMovie = await this.movieModel
      .aggregate([{ $sample: { size: 1 } }])
      .exec();
    return randomMovie[0];
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create(createMovieDto);
  }

  async remove(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id);
  }
}
