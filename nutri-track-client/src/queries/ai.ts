import axiosInstance from "../axiosInstance";

interface AiQuestionPayload {
    question: string;
  }

const AI_ROUTE = "/ai";

// Ask gemini a question function
export const askQuestion = async (
  payload: AiQuestionPayload,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.post(
      `${AI_ROUTE}/`,
        payload,
       { headers: {"authorization" : `Bearer ${accessToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "ai query failed");
  }
};
