import {GoogleGenerativeAI} from "@google/generative-ai";

const appBackground: string = 
`We are a website that promotes a healthy lifestyle with an emphasis on proper nutrition and incorporating physical activity.
On this site, various users will be able to share their journey by posting text content or images showcasing meals they've eaten, activities they've done, changes they've undergone (in weight, blood fat levels, physical abilities, etc.), and anything else related to their process towards a healthy lifestyle.`

export const geminiAskQuestion = async (question: string) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY must be defined");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(appBackground + question);
        return result.response.text();

    } catch (error) {
        throw new Error(error);
    }
};
