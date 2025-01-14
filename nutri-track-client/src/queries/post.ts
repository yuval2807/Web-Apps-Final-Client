import axiosInstance from "../axiosInstance";

interface CreatePostPayloadData {
  title: string;
  content: string;
  image?: string;
  sender: string;
}

const POST_ROUTE = "/post";

// Get all posts function
export const getAllPosts = async (
    accessToken: string,
    sender?: string
  ) => {
    try {
      const response = await axiosInstance.get(
        `${POST_ROUTE}/${sender ? `?sender=${sender}` : ""}`,
          { headers: {"authorization" : `Bearer ${accessToken}`} }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "posts query failed");
    }
  };

// Create post function
export const createPost = async (
  payload: CreatePostPayloadData,
  accessToken: string
) => {
    const parsedData = {title: payload.title, content: payload.content, sender: payload.sender}; //TODO: add image (backend can't receive image yet)
  try {
    const response = await axiosInstance.post(
      `${POST_ROUTE}/`,
        parsedData,
        { headers: {"authorization" : `Bearer ${accessToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post creation failed");
  }
};
