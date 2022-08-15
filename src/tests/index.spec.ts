import request from "supertest";
import app from "../server";

it("gives status 404 for random routes", async () => {
  const response = await request(app).get("/qweq");
  expect(response.status).toEqual(404);
});

it("missing filename", async () => {
  const response = await request(app).get("/api/images");
  expect(response.status).toEqual(400);
});

it("serves image", async () => {
  const response = await request(app).get("/api/images?filename=1");
  expect(response.status).toEqual(200);
});
