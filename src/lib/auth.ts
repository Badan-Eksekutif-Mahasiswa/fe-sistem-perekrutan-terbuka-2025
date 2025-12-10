import { AuthResponse } from "@/types/auth";

// Configure your backend URL here
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const authApi = {
  /**
   * Initiate SSO login - redirects the browser to the backend SSO endpoint
   */
  login: (redirectPath: string = "/dashboard") => {
    const loginUrl = `${BACKEND_URL}/auth/sso?redirect=${encodeURIComponent(
      redirectPath
    )}`;
    window.location.href = loginUrl;
  },

  /**
   * Check current authentication status and get user info
   */
  getSession: async (): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/session`, {
        method: "GET",
        credentials: "include", // Important: sends HttpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Authentication failed",
        };
      }

      return data;
    } catch (error) {
      console.error("Auth session check failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
  },

  /**
   * Logout user and destroy session
   */
  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Logout failed",
        };
      }

      return data;
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        message: "Network error during logout",
      };
    }
  },
};
