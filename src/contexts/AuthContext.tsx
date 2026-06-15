"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthContextType } from "@/types/auth";
import { authApi } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { show } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authApi.getSession();
      const sessionUser = response.data?.user ?? response.user;

      if (response.success && sessionUser) {
        setUser(sessionUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (redirectPath?: string) => {
    authApi.login(redirectPath);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await authApi.logout();

      if (response.success) {
        setUser(null);
        show("success", "Successfully logged out");
        router.push("/");
      } else {
        show("error", response.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      show("error", "An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
