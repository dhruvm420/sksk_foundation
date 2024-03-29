import axios from "axios";
import { baseUrl } from "./baseURL";

// Create a new Axios instance with custom configuration (optional)
const axiosInstance = axios.create({
  baseURL: baseUrl, // Your API base URL
});

// Set up Axios interceptor to include JWT token in the header
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export { axiosInstance, setAuthToken };
