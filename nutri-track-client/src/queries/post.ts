import axiosInstance from "../axiosInstance";

export interface PostData {
  title: string;
  content: string;
  image?: string;
  date: Date;
}

interface CreatePostPayloadData {
  title: string;
  content: string;
  image?: string;
  date: Date;
  sender: string;
}

const POST_ROUTE = "/post";

// Get all posts function
export const getAllPosts = async (
  accessToken: string,
  sender?: string
): Promise<PostData[]> => {
  try {
    const response = await axiosInstance.get(
      `${POST_ROUTE}/${sender ? `?sender=${sender}` : ""}`,
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
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
    console.log("createPost payload: ", payload);
    const response = await axiosInstance.post(`${POST_ROUTE}/`, payload, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post creation failed");
  }
};
