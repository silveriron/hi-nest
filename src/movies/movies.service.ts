import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entities";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie[] {
    return this.movies.filter(movie => movie.id === id);
  }

  deleteOne(id: number) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    return this.movies;
  }

  create(movieData: CreateMovieDto): Movie[] {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies;
  }

  updateOne(id: number, MovieData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie[0], ...MovieData });
  }
}
