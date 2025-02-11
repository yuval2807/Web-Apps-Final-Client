import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import userModel from "../models/user";
import { Express } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";

let app: Express;
const baseUrl = "/auth";

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

  console.log("testUser", testUser);
  expect(response.statusCode).toBe(200);
});
afterAll(() => {
  console.log("After all tests");
  mongoose.connection.close();
});

describe("Auth Tests", () => {
  test("Add new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };
    const response = await request(app)
      .post(`${baseUrl}/register`)
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.accessToken).toHaveLength;
    expect(response.body.refreshToken).toHaveLength;

    testUser._id = response.body._id;
  });

  test("Add new user with same email - fail", async () => {
    const response = await request(app)
      .post(`${baseUrl}/register`)
      .send(testUser);
    expect(response.statusCode).toBe(400);
  });

  test("verify access token", async () => {
    const verifiedUser = await verifyAccessToken(testUser.accessToken);
    expect(verifiedUser).toHaveProperty("_id");
  });

  test("verify refresh token", async () => {
    const verifiedUser = await verifyRefreshToken(testUser.refreshToken);
    expect(verifiedUser).toHaveProperty("_id");
  });

  //   //   test("verify access token - fail with Invalid access token", async () => {
  //   //     const verifiedUser = await verifyAccessToken(`${testUser.accessToken}h`);
  //   //     expect(verifiedUser).toThrow(UnauthorizedError);
  //   //   });

  //   //   test("verify refresh token - fail with Invalid refresh token", async () => {
  //   //     const verifiedUser = await verifyRefreshToken(`${testUser.refreshToken}h`);
  //   //     expect(verifiedUser).toThrow(UnauthorizedError);
  //   //   });

  test("logout user", async () => {
    const response = await request(app)
      .get(`${baseUrl}/logout`)
      .set({ authorization: "Bearer " + testUser.refreshToken });
    expect(response.statusCode).toBe(200);
  });

  test("logout user - faild with missing token", async () => {
    const response = await request(app).get(`${baseUrl}/logout`);
    expect(response.statusCode).toBe(400);
  });

  // test("logout user - faild with wrong token", async () => {
  //   const response = await request(app)
  //     .get(`${baseUrl}/logout`)
  //     .set({ authorization: "Bearer " + testUser.accessToken });
  //   expect(response).toThrow(Error);
  // });

  // test("refresh user", async () => {
  //   const response = await request(app)
  //     .get(`${baseUrl}/refresh`)
  //     .set({ authorization: "Bearer " + testUser.refreshToken });
  //   expect(response.statusCode).toBe(200);
  // });

  // test("refresh user - faild with wrong token", async () => {
  //   const response = await request(app)
  //     .get(`${baseUrl}/refresh`)
  //     .set({ authorization: "Bearer " + testUser.accessToken });
  //   expect(response.statusCode).toBe(400);
  // });

  //   test("refresh user - faild with missing token", async () => {
  //     const response = await request(app).get(`${baseUrl}/refresh`);
  //     expect(response.statusCode).toBe(400);
  //   });
});
