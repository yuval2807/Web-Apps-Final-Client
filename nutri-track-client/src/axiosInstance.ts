import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default axiosInstance;
