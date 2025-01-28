import express, { Request, Response } from "express";
import { addNewLike, getLike, removeLike } from "../controllers/like";

import authenticateToken from "../middleware/jwt";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *  name: Like
 *  description: The Likes API
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
 *       Like:
 *           type: object
 *           required:
 *               - postId
 *               - userId
 *           properties:
 *                 postId:
 *                   type: string
 *                   description: The liked post
 *                 userId:
 *                   type: string
 *                   description: The liking user
 *           example:
 *               postId: '64gj866arc40'
 *               userId: '64gj866arc40'
 * 
 *       LikeResponse:
 *           type: object
 *           required:
 *               - postId
 *               - userId
 *               - _id
 *           properties:
 *               postId:
 *                   type: string
 *                   description: The liked post
 *               userId:
 *                   type: string
 *                   description: The liking user
 *               _id:
 *                  type: string
 *                 description: The like id
 *           example:
 *               postId: '64gj866arc40'
 *               userId: '64gj866arc40'
 *               _id: '64gj866arc40'
 */

/**
 * @swagger
 * /like/find:
 *   post:
 *       summary: Retrieve one like
 *       tags: [Like]
 *       security:
 *           - bearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Like'
 *       responses:
 *           200:
 *               description: A specific like
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LikeResponse'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */
router.post("/find", async (req: Request, res: Response) => {
  const like = req.body;

  try {
    const found = await (getLike(like));
    if (!found) res.status(404).json({ message: "Like not found" });
    else res.status(200).send(found);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /like:
 *   post:
 *       summary: Add like to post
 *       tags: [Like]
 *       security:
 *           - bearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Like'
 *       responses:
 *           200:
 *               description: A new like
 *               content:
 *                   application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Like'
 *           400:
 *              description: Bad request
 */

router.post("/", async (req: Request, res: Response) => {
  const like = req.body;

  try {
    res.status(200).send(await addNewLike(like));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /like:
 *   delete:
 *       summary: Remove a like on post by user
 *       tags: [Like]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A specific comment
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Like'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.delete("/:id", async (req: Request, res: Response) => {
  const likeId = req.params.id;
  try {
    res.status(200).send(await removeLike(likeId));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
