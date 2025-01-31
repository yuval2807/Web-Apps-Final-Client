import { geminiAskQuestion } from "../utils/gemini";

export const askQuestion = async (question: string) => {
    return await geminiAskQuestion(question);
};
