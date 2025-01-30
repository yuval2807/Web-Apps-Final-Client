import {GoogleGenerativeAI} from "@google/generative-ai";

export const askQuestion = async (question: string) => {

const genAI = new GoogleGenerativeAI("AIzaSyDv9mXr16sMSuMgzLdp7Hyxd3nQKF9IwFA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent(question);
return result.response.text();
};
