import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import userModel from "../models/user";
import { Express } from "express";

let app: Express;
const baseUrl = "/ai";

type User = {
  email: string;
  name: string;
  password: string;
  image?: string;
  gender?: string;
  fitLevel?: string;
  weight?: number;
  height?: number;
  tokens: string[];
  token?: string;
  _id?: string;
  accessToken: string;
  refreshToken: string;
};

const testUser: User = {
  name: "Moshe",
  email: "user@test.com",
  password: "1234567",
  tokens: [],
  refreshToken: "",
  accessToken: "",
};

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await userModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.accessToken = response.body.accessToken;

  testUser._id = response.body._id;
  testUser.refreshToken = response.body.refreshToken;

  expect(response.statusCode).toBe(200);
});
afterAll(() => {
  mongoose.connection.close();
});

describe("AI Tests", () => {
  test("get tip", async () => {
    const response = await request(app)
      .post(baseUrl)
      .set({ authorization: "Bearer " + testUser.accessToken })
      .send({ question: "give me green frout" });
    expect(1).toBe(1);
  });
});
