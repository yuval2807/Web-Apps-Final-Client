import request from "supertest";
import appInit from "../../server";
import mongoose from "mongoose";
import postsModel from "../models/post";
import testPostsData from "./test_posts.json";
import { Express } from "express";

let app: Express;
const baseUrl = "/post";

type Post = {
  _id?: string;
  title: string;
  content: string;
  sender: string;
  image?: string;
  date?: Date;
};

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

const testPosts: Post[] = testPostsData;

beforeAll(async () => {
  console.log("Before all tests");
  app = await appInit();
  await postsModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body.id;
console.log ("testUser", testUser);
  expect(response.statusCode).toBe(200);
});

afterAll(() => {
\  mongoose.connection.close();
});

describe("Posts Test", () => {
  test("Test get all post empty", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(0);
  });

  test("Test create new post", async () => {
    for (let post of testPosts) {
      const response = await request(app)
        .post(baseUrl)
        .set({ authorization: "Bearer " + testUser.token })
        .send({...post, date: new Date(), sender: testUser._id});
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
     post._id = response.body._id;
    }
  });

  test("Test get all post", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(testPosts.length);
  });

  test("Test get post by id", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + testPosts[0]._id)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPosts[0]._id);
  });

  test("Test get post by id - fail", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + "671255646e4e44444111194e0")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).not.toBe(200);
  });

  test("Test get post by id - fail - post not found", async () => {
    const response = await request(app)
      .get(baseUrl + "/" + "671255646e4e8456c15594e0")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(404);
  });

  test("Test filter post by sender", async () => {
    const response = await request(app)
      .get(baseUrl + "?senderId=" + testUser._id)
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).toBe(200);
  });

  test("Test filter post by sender - fail", async () => {
    const response = await request(app)
      .get(baseUrl + "?senderId=" + "121212")
      .set({ authorization: "Bearer " + testUser.token });
    expect(response.statusCode).not.toBe(200);
  });

  test("Test update post", async () => {
    const response = await request(app)
      .put(baseUrl + "/" + testPosts[0]._id)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        content: "Post content updated",
      });
    expect(response.statusCode).toBe(200);
  });

  test("Test update post - fail", async () => {
    const response = await request(app)
      .put(baseUrl + "/656565")
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        content: "Post content updated",
      });
    expect(response.statusCode).not.toBe(200);
  });

  test("Test update post - fail - post not found", async () => {
    const response = await request(app)
      .put(baseUrl + "/671255646e4e8456c15594e0")
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        content: "Post content updated",
      });
    expect(response.statusCode).toBe(404);
  });

  test("Test create new post fail", async () => {
    const response = await request(app)
      .post(baseUrl)
      .set({ authorization: "Bearer " + testUser.token })
      .send({
        content: "Test Content 1",
      });
    expect(response.statusCode).not.toBe(200);
  });
});
