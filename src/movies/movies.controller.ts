import { Controller, Get, Param, Post, Delete, Patch, Body, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entities";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly MovieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.MovieService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    console.log(id);
    const movie = this.MovieService.getOne(id);
    if (movie.length === 0) {
      throw new NotFoundException("this id is not Found");
    } else {
      return movie;
    }
  }

  @Post()
  postOne(@Body() movieData: CreateMovieDto) {
    return this.MovieService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    this.getOne(id);
    return this.MovieService.deleteOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() movieData: UpdateMovieDto) {
    this.MovieService.updateOne(id, movieData);
  }
}
