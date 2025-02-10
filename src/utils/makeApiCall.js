import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://your-api-url.com", // Set base URL from environment variable
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request Interceptor: Add token to headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or use another method (e.g. cookies)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data from the response
  },
  (error) => {
    let errorMessage = "An error occurred. Please try again later.";
    
    if (error.response) {
      // Server responded with a status code outside 2xx
      switch (error.response.status) {
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 500:
          errorMessage = "Internal server error.";
          break;
        default:
          errorMessage = error.response.data.message || errorMessage;
      }
    } else if (error.request) {
      // No response received from the server
      errorMessage = "No response from the server. Please check your network.";
    }

    // Optionally, you can log errors to a service like Sentry, etc.
    console.error(errorMessage);
    
    return Promise.reject(errorMessage); // Return error message to caller
  }
);

export const apiGet = (url, params = {}) => api.get(url, { params });
export const apiPost = (url, data = {}) => api.post(url, data);
export const apiPut = (url, data = {}) => api.put(url, data);
export const apiDelete = (url) => api.delete(url);

export default api;
