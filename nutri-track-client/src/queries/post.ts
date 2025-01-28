import axiosInstance from "../axiosInstance";

interface CreatePostPayloadData {
  title: string;
  content: string;
  image?: string;
  date: Date;
  numOfLikes?: number;
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
  try {
    const response = await axiosInstance.post(
      `${POST_ROUTE}/`,
        payload,
        { headers: {"authorization" : `Bearer ${accessToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post creation failed");
  }
};

// Update post function
export const updatePost = async (
  payload: CreatePostPayloadData,
  postId: string,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.put(
      `${POST_ROUTE}/${postId}`,
        payload,
        { headers: {"authorization" : `Bearer ${accessToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post update failed");
  }
};
