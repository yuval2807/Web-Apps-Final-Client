import axiosInstance from "../axiosInstance";
import { PostData } from "./post";

export interface Comment {
  id: number;
  user: string;
  message: string;
  avatar?: string;
}

export interface CommentPayload {
  user: string;
  message: string;
  post: string;
}

const COMMENT_ROUTE = "/comment";

export const getCommentsByPostId = async (
  postId: PostData["_id"],
  accessToken: string
) => {
  try {
    const response = await axiosInstance.get(
      // `${COMMENT_ROUTE}/${postId ? `?postId=${postId}` : ""}`,
      `${COMMENT_ROUTE}/`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "getCommentsByPostId failed"
    );
  }
};

export const createComment = async (
  payload: CommentPayload,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.post(`${COMMENT_ROUTE}/`, payload, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "comment creation failed");
  }
};
