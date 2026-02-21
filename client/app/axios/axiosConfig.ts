import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        // We use the base axios instance to avoid infinite loops with the interceptor
        await axios.post(
          `${API_BASE_URL}/api/users/refresh`,
          {},
          { withCredentials: true },
        );

        // If refresh successful, retry original request with the api instance
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, we propagate the error so components can handle it
        // Do NOT force redirect here as it causes loops with global AuthInitializer
        // if (typeof window !== "undefined") {
        //   window.location.href = "/login";
        // }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
