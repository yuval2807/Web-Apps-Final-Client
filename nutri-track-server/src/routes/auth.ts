import express, { Request, Response } from "express";
const router = express.Router();
import { login, logout, refresh } from "../controllers/auth";
import { addNewUser } from "../controllers/user";

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Authentication API
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *               - fitLevel
 *               - gender
 *               - height
 *               - weight
 *           properties:
 *               email:
 *                   type: string
 *                   description: The user email
 *               password:
 *                   type: string
 *                   description: The user password
 *           example:
 *               email: 'bob@gmail.com'
 *               password: '123456'
 *               name: 'Bob'
 *               height: 164
 *               weight: 50
 *               gender: 'female'
 *       FullUser:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *           properties:
 *               email:
 *                   type: string
 *                   description: The user email
 *               password:
 *                   type: string
 *                   description: The user password
 *               name:
 *                   type: string
 *                   description: The user name
 *               fitLevel:
 *                   type: string
 *                   description: The user fitLevel
 *               gender:
 *                   type: string
 *                   description: The user gender
 *               height:
 *                   type: number
 *                   description: The user height
 *               weight:
 *                   type: number
 *                   description: The user weight
 *           example:
 *               email: 'bob@gmail.com'
 *               password: '123456'
 *               name: 'Bob'
 *               height: 164
 *               weight: 50
 *               gender: 'female'
 *       Tokens:
 *          type: object
 *          required:
 *              - accessToken
 *              - refreshToken
 *          properties:
 *              accessToken:
 *                  type: string
 *                  description: The JWT access token
 *              refreshToken:
 *                  type: string
 *                  description: The JWT refresh token
 *          example:
 *              accessToken: '123cd123x1xx1'
 *              refreshToken: '134r2134cr1x3c'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *       summary: login user
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           200:
 *               description: The access & refresh tokens
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Tokens'
 *           400:
 *              description: Bad request
 */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    res.status(200).send(await login(email, password));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *       summary: logout a user
 *       tags: [Auth]
 *       description: need to provide the refresh token in the auth header
 *       security:
 *           - bearerAuth: []
 *       responses:
 *           200:
 *               description: logout completed successfully
 *           400:
 *              description: Bad request
 */
router.get("/logout", async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  if (!refreshToken || refreshToken === "null") {
    res.status(401).send("Refresh token missing");
    return;
  }

  try {
    res.status(200).send(await logout(refreshToken));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *       summary: get a new access token using the refresh token
 *       tags: [Auth]
 *       description: need to provide the refresh token in the auth header
 *       security:
 *           - bearerAuth: []
 *       responses:
 *           200:
 *               description: The acess & refresh tokens
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Tokens'
 *           400:
 *              description: Bad request
 */
router.get("/refresh", async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // פורמט: "Bearer <token>"

  try {
    res.status(200).send(await refresh(refreshToken));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *       summary: registers a new user
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/FullUser'
 *       responses:
 *           200:
 *               description: The new user
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/FullUser'
 *           400:
 *              description: Bad request
 */
router.post("/register", async (req: Request, res: Response) => {
  const user = req.body;

  try {
    res.status(200).send(await addNewUser(user));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
