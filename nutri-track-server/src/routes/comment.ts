import express, { Request, Response } from "express";
const router = express.Router();
import {
  getAllComments,
  getCommentById,
  addNewComment,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
} from "../controllers/comment";

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: The comments API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       Comments:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               message:
 *                   type: string
 *               post:
 *                   type: string
 *               user:
 *                   type: string
 *           example:
 *              _id: 'hgsfjhskljslkgl2kgldjd'
 *              message: 'example message'
 *              post: 'hbjjgsiayhnnsh'
 *              user: 'adraaggayajala'
 *       CommentsBody:
 *           type: object
 *           required:
 *              - message
 *              - post
 *              - user
 *           properties:
 *               message:
 *                   type: string
 *               post:
 *                   type: string
 *               user:
 *                   type: string
 *           example:
 *              message: 'example message'
 *              post: 'hbjjgsiayhnnsh'
 *              user: 'adraaggayajala'
 */

/**
 * @swagger
 * /comment:
 *   get:
 *       summary: Retrieve a list of all comments by post id
 *       tags: [Comments]
 *       security:
 *           - bearerAuth: []
 *       parameters:
 *          - name: postId
 *            in: path
 *            required: false
 *            schema:
 *              type: string
 *       responses:
 *           200:
 *               description: A list of all comments in post
 *               content:
 *                   application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 */
router.get("/", async (req: Request, res: Response) => {
  const postId = req.query.postId;

  try {
    if (postId) res.status(200).send(await getCommentsByPostId(postId));
    else {
      res.status(200).send(await getAllComments());
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *       summary: Retrieve a comment by id
 *       tags: [Comments]
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
 *                          $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const comment = await getCommentById(id);
    if (!comment) res.status(404).json({ message: "Comment not found" });
    else res.status(200).send(comment);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /comment:
 *   post:
 *       summary: craete new comment
 *       tags: [Comments]
 *       security:
 *           - bearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CommentsBody'
 *       responses:
 *           200:
 *               description: A specific comment
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.post("/", async (req: Request, res: Response) => {
  const comment = req.body;
  try {
    res.status(201).send(await addNewComment(comment));
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /comment/{comment_id}:
 *   put:
 *       summary: Update a comment by id
 *       tags: [Comments]
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
 *                          $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = req.body;

  try {
    const updatedComment = await updateCommentById(id, comment);

    if (!updatedComment) res.status(404).json({ message: "Comment not found" });
    else res.status(200).send(updatedComment);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /comment/{comment_id}:
 *   delete:
 *       summary: Delete a comment by id
 *       tags: [Comments]
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
 *                          $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.delete("/:id", async (req: Request, res: Response) => {
  const commentId = req.params.id;
  try {
    res.status(200).send(await deleteCommentById(commentId));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
