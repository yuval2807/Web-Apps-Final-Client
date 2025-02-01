import { geminiAskQuestion } from "../utils/gemini";

export const askQuestion = async (question: string) => await geminiAskQuestion(question);
