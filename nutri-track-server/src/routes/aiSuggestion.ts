import express, { Request, Response } from "express";
import { askQuestion} from "../controllers/aiSuggestion";

import authenticateToken from "../middleware/jwt";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *  name: AI
 *  description: The GeminiAI API
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
 *       Question:
 *           type: object
 *           required:
 *               - question
 *           properties:
 *               question:
 *                   type: string
 *                   description: The question for the AI
 *           example:
 *               question: 'what is the best food for weight loss?'
 */

/**
 * @swagger
 * /ai:
 *   post:
 *       summary: Get AI response
 *       tags: [AI]
 *       security:
 *           - bearerAuth: []
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Question'
 *       responses:
 *           200:
 *               description: Updated user
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.post("/", async (req: Request, res: Response) => {
  const question = req.body.question;

  try {
    const answer = await askQuestion(question);

    if (!answer) res.status(404).json({ message: "Couldn't get answer from gemini AI" });
    else res.status(200).send(answer);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
