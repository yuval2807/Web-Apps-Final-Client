import express, { NextFunction, Request, Response } from "express";
import {
  getPostById,
  addNewPost,
  updatePostById,
  getAllPostsWithLikes,
  getAllPostsWithLikesBySender,
  deletePostById,
  countTotalRecords,
} from "../controllers/post";
import authenticateToken from "../middleware/jwt";

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       Post:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               sender:
 *                   type: string
 *           example:
 *              _id: 'hgsfjhskljslkgl2kgldjd'
 *              title: 'example title'
 *              content: 'example content'
 *              sender: 'adraaggayajala'
 *       PostBody:
 *           type: object
 *           required:
 *              - title
 *           properties:
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *           example:
 *              title: 'example title'
 *              content: 'example content'
 */

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /post:
 *   get:
 *       summary: Retrieve a list of all posts
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: senderId
 *            in: path
 *            required: false
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A list of posts
 *               content:
 *                   application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 */
router.get("/", async (req: Request, res: Response, next: NextFunction  ) => {
  const senderId: string = req.query.senderId?.toString();
  const page = parseInt(req.query.page?.toString()) || 1;
  const limit = parseInt(req.query.limit?.toString()) || 10;
  const skip = (page - 1) * limit;

  try {
    if (senderId)
      res
        .status(200)
        .json({ posts: await getAllPostsWithLikesBySender(senderId) });
    else {
      const posts = await getAllPostsWithLikes(skip, limit);
      const total = await countTotalRecords();
      res.status(200).json({
        posts,
        totalPages: Math.ceil(total / limit),
      });
    }
  } catch (err) {
   next(err)
  }
});

/**
 * @swagger
 * /post/{post_id}:
 *   get:
 *       summary: Retrieve a post by id
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: post_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A specific post
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */
router.get("/:post_id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.post_id;

  try {
    const post = await getPostById(id);
    if (!post) res.status(404).send({ message: "Post not found" });
    else res.status(200).send(post);
  } catch (err) {
   next(err)
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const post = req.body;

  try {
    res.status(200).send(await addNewPost(post));
  } catch (err) {
   next(err)
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await updatePostById(id, post);

    if (!updatedPost) res.status(404).json({ message: "Post not found" });
    else res.status(200).send(updatedPost);
  } catch (err) {
   next(err)
  }
});

/**
 * @swagger
 * /post/{post_id}:
 *   delete:
 *       summary: Delete a post by id
 *       tags: [Posts]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: post_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A specific post is deleted
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;
  try {
    res.status(200).send(await deletePostById(postId));
  } catch (err) {
   next(err)
  }
});

export default router;
