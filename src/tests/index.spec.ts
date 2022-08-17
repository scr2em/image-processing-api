import request from "supertest";
import path from "path";
import fs from "fs";
import app from "../server";
import { isFileExist } from "../utils";

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

it("resize image ", async () => {
  const filename = 1;
  const width = 199;
  const height = 199;
  const expectedOutputDir = path.normalize(`${__dirname}/../thumbs/${filename}-${width}-${height}.jpg`);
  if (await isFileExist(expectedOutputDir)) {
    fs.unlinkSync(expectedOutputDir);
  }
  await request(app).get("/api/images?filename=1&width=199&height=199");
  expect(await isFileExist(expectedOutputDir)).toEqual(true);
});
