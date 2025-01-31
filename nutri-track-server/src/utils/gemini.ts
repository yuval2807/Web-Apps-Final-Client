import {GoogleGenerativeAI} from "@google/generative-ai";

export const geminiAskQuestion = async (question: string) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY must be defined");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(question);
        return result.response.text();

    } catch (error) {
        console.log("error: ", error);
        throw new Error(error);
    }
};
