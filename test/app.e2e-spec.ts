import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Hello, This is Movie API");
  });

  describe("movies", () => {
    it("get all movies", () => {
      return request(app.getHttpServer()).get("/movies").expect(200).expect([]);
    });

    it("create movie 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({ title: "test", year: 2022, genres: ["test"] })
        .expect(201);
    });
    it("create movie 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({ title: "test", year: 2022, genres: ["test"], likes: 5 })
        .expect(400);
    });
  });

  describe("movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    });
    it("PATCH 200", () => {
      return request(app.getHttpServer()).patch("/movies/1").expect(200);
    });
    it("DELETE 200", () => {
      return request(app.getHttpServer()).delete("/movies/1").expect(200);
    });
  });
});
