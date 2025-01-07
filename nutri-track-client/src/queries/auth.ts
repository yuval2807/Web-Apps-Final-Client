import axiosInstance from "../axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const AUTH_ROUTE = "/auth";
// Login function
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(`${AUTH_ROUTE}/login`, payload);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Register function
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
