import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should be an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should find a movie", () => {
      service.create({
        title: "test movie",
        year: 2099,
        genres: ["Action"],
      });
      const movie = service.getOne(1)[0];
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should response 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("this id is not Found");
      }
    });
  });

  describe("delete", () => {
    it("delete movies", () => {
      service.create({
        title: "test movie",
        year: 2099,
        genres: ["Action"],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should response 404 error", () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("create movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie",
        year: 2099,
        genres: ["Action"],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("update movie", () => {
      service.create({
        title: "test movie",
        year: 2099,
        genres: ["Action"],
      });
      const beforeUpdate = service.getOne(1)[0].year;
      service.updateOne(1, { year: 2012 });
      const afterUpdate = service.getOne(1)[0].year;
      expect(afterUpdate).toBeLessThan(beforeUpdate);
    });

    it("should response 404 error", () => {
      try {
        service.updateOne(999, { year: 2022 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
