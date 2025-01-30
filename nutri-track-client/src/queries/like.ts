import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

interface CreateLikeData {
  userId: string;
    postId: string;
}

const LIKE_ROUTE = "/like";

// Find one like function
export const findOneLike= async (
    like: CreateLikeData,
    accessToken: string
  ) => {
    let response = null
    try {
       response = await axiosInstance.post(
        `${LIKE_ROUTE}/find`,
            like,
          { headers: {"authorization" : `Bearer ${accessToken}`} }
      );
      if (response.status === 200) {
        return true;
      }
        else {
            return false
        }
    } catch (error: any) {
        if (response?.status === 404) {
            return false;
          } 
    //   throw new Error(error.response?.data?.message || "Like query failed");
    }
  };

// Create like function
export const createLike = async (
  payload: CreateLikeData,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.post(
      `${LIKE_ROUTE}/`,
        payload,
        { headers: {"authorization" : `Bearer ${accessToken}`} }
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "like creation failed");
  }
};

// Remove like function
export const removeLike = async (
    like: CreateLikeData,
    accessToken: string
  ) => {
    try {
        const foundLike = await axiosInstance.post(
            `${LIKE_ROUTE}/find`,
                like,
              { headers: {"authorization" : `Bearer ${accessToken}`} }
          );
        if (!foundLike) throw new Error("Like not found");
        else {
            const response = await axiosInstance.delete(
                `${LIKE_ROUTE}/${foundLike.data._id}`,
                  { headers: {"authorization" : `Bearer ${accessToken}`} }
              );
            return response;
        }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "like creation failed");
    }
  };