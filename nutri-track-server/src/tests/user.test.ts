import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import userModel from "../models/user";
import { Express } from "express";

let app: Express;
const baseUrl = "/user";

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
};

const testUser: User = {
  name: "Moshe",
  email: "user@test.com",
  password: "1234567",
  tokens: [],
};

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await userModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body.id;
  expect(response.statusCode).toBe(200);
});
afterAll(() => {
  mongoose.connection.close();
});

describe("Auth Tests", () => {
  test("Get user by ID", async () => {
    const response = await request(app)
      .get(`${baseUrl}/${testUser._id}`)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testUser._id);
  });

  test("Get user by ID - fail (invalid ID)", async () => {
    const response = await request(app)
      .get(`${baseUrl}/invalidID`)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(500);
  });

  test("Update user by ID", async () => {
    const updateData = {
      name: "Updated Name",
      height: 175,
      weight: 70,
    };
    const response = await request(app)
      .put(`${baseUrl}/${testUser._id}`)
      .send(updateData)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  });
});
