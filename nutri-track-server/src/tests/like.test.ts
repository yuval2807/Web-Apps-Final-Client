import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import userModel from "../models/user";
import likeModel from "../models/like";
import { Express } from "express";

let app: Express;
const likeUrl = "/like";

const testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "testpassword",
  tokens: [],
  accessToken: "",
  id: "67925e4359808757b6e3b5d9",
};

let testLike = {
  userId: "/",
  postId: "6734d9ef7deba0e935a8a5f1",
  id: "",
};

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await userModel.deleteMany();
  await likeModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.accessToken = response.body.accessToken;
  testUser.id = response.body.id;
  testLike.userId = testUser.id;
  console.log("testUser", testUser);
  expect(response.statusCode).toBe(200);
});

afterAll(() => {
  console.log("After all tests");
  mongoose.connection.close();
});

describe("Like Service Tests", () => {
  test("Add new like", async () => {
    const response = await request(app)
      .post(likeUrl)
      .send(testLike)
      .set({ authorization: "Bearer " + testUser.accessToken });
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(testLike.userId);
    testLike.id = response.body._id;
  });

  test("Get like by user and post", async () => {
    const response = await request(app)
      .get(`${likeUrl}/find/${testLike.postId}`)
      .query(testLike)
      .set({ authorization: "Bearer " + testUser.accessToken });
    expect(response.statusCode).toBe(200);
    expect(response.body.likesCount).toBeGreaterThan(0);
  });

  test("Remove like", async () => {
    const response = await request(app)
      .delete(`${likeUrl}/${testLike.id}`)
      .set({ authorization: "Bearer " + testUser.accessToken });
    expect(response.statusCode).toBe(200);
  });
});
