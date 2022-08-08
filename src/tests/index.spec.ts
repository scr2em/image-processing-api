import request from "supertest";
import app from "../server";

it("give random routes a 404 status", async () => {
  const response = await request(app).get("/qweq");
  expect(response.status).toEqual(404);
});

it("missing filename", async () => {
  const response = await request(app).get("/api/images");
  expect(response.status).toEqual(400);
});
