"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/auth";

type UserRole = NonNullable<User["role"]>;

/**
 * Hook to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return { user, isLoading };
}

/**
 * Hook to redirect authenticated users away from public pages (like login)
 */
export function useRedirectIfAuth(redirectTo: string = "/dashboard") {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return { user, isLoading };
}

/**
 * Hook to protect routes by role.
 */
export function useRequireRole(
  allowedRoles: UserRole[],
  redirectTo: string = "/login",
  forbiddenRedirectTo: string = "/"
) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push(redirectTo);
      return;
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
      router.push(forbiddenRedirectTo);
    }
  }, [allowedRoles, forbiddenRedirectTo, isLoading, redirectTo, router, user]);

  return {
    user,
    isLoading,
    isAuthorized: Boolean(user?.role && allowedRoles.includes(user.role)),
  };
}
