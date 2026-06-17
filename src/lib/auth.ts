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

  internalLogin: async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("Internal login failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
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

  createAdmin: async (payload: {
    name: string;
    email: string;
    password: string;
    role?: "ADMIN" | "SUPERADMIN";
  }): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/admins`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to create admin",
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("Create admin failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to request password reset",
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("Forgot password failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
  },

  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to reset password",
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("Reset password failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to change password",
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error("Change password failed:", error);
      return {
        success: false,
        message: "Network error or server unavailable",
      };
    }
  },
};
