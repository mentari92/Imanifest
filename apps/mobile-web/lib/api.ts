import { Platform } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(async (config) => {
  try {
    let token = null;
    if (Platform.OS === "web") {
      token = typeof localStorage !== "undefined" ? localStorage.getItem("imanifest_jwt_token") : null;
    } else {
      token = await SecureStore.getItemAsync("imanifest_jwt_token");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (Platform.OS === "web") {
      // FOR HACKATHON DEMO: Fallback to demo token if logged out
      config.headers.Authorization = "Bearer demo_token_high_vibration_888";
    }
  } catch {
    // Ignore errors
  }
  return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong. Try again.";
    return Promise.reject(new Error(message));
  }
);