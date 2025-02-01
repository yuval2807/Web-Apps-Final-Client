import axiosInstance from "../axiosInstance";
import { ConnectedUser } from "../context/UserContext";
import { User } from "./user";

interface LoginPayload {
  email: string;
  password: string;
}

const AUTH_ROUTE = "/auth";
// Login function
export const login = async (payload: LoginPayload): Promise<ConnectedUser> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ROUTE}/login`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Register function
export const register = async (payload: User): Promise<ConnectedUser> => {
  try {
    const response = await axiosInstance.post(
      `${AUTH_ROUTE}/register`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Logout function
export const logout = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.get(`${AUTH_ROUTE}/logout`, {
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const googleLogin = async (
  credential: string
): Promise<ConnectedUser> => {
  try {
    const response = await axiosInstance.post(
      `${AUTH_ROUTE}/google`, // Your backend endpoint
      { credential }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
