import axiosInstance from "../axiosInstance";

export interface PostData {
  _id: string;
  title: string;
  content: string;
  image?: string;
  sender: string;
  numOfLikes: number;
  date: Date;
}

interface CreatePostPayloadData {
  title: string;
  content: string;
  image?: string;
  date: Date;
  sender: string;
}

interface PostsResponse {
  posts: PostData[];
  totalPages: number;
}

const POST_ROUTE = "/post";

// Get all posts function
export const getAllPosts = async (
  accessToken: string,
  page: number,
  sender?: string
): Promise<PostsResponse> => {
  try {
    let url: string = `${POST_ROUTE}/`;
    if (sender) {
      url = url.concat(`?senderId=${sender}`);
    }
    if (page > 0) {
      url = url.concat(`?page=${page}&limit=10`);
    }
    const response = await axiosInstance.get(url, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
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
    const response = await axiosInstance.post(`${POST_ROUTE}/`, payload, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
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
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post update failed");
  }
};

// Delete post function
export const deletePost = async (postId: string, accessToken: string) => {
  try {
    const response = await axiosInstance.delete(`${POST_ROUTE}/${postId}`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "post deletion failed");
  }
};
