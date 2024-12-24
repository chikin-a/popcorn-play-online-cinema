import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, default: 'finish' })
  status: 'anons' | 'finish';

  // Додати вікове обмеження

  @Prop({ required: true })
  genres: string[];

  @Prop({ required: true })
  country: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  views: number;

  @Prop({ required: false })
  duration: number;

  @Prop({ required: false })
  rating: number;

  @Prop({ required: false })
  posterUrl: string;

  @Prop({ required: false })
  bannerUrl: string;

  @Prop({ required: false })
  trailerUrl: string;

  @Prop({ required: false })
  related: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
