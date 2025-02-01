import axiosInstance from "../axiosInstance";
import { ConnectedUser } from "../context/UserContext";

export interface User {
    email: string;
    name: string;
    password: string;
    gender: string;
    fitLevel: string;
    weight: number;
    height: number;
  }
  
const USER_ROUTE = "/user";

export const getUserById = async (
  refreshToken: string,
  userId: ConnectedUser["id"]
): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${USER_ROUTE}/${userId}`, {
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "getUserById failed");
  }
};
