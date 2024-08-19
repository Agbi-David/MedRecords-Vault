import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies().get("authToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if it's successful
    return response;
  },
  (error) => {
    // Check if the error is due to unauthorized access (status code 401)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access here, such as redirecting to login page or showing a message
      console.log("Unauthorized request:", error.response.data);
      cookies().delete;
      window.location.reload();
    }
    // Return the error to be handled by the calling function
    return Promise.reject(error);
  }
);

export default axiosInstance;
