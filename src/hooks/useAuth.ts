"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@/types/auth";

type UserRole = NonNullable<User["role"]>;

const getLoginRedirectUrl = (redirectTo: string, pathname: string) => {
  if (redirectTo !== "/login") {
    return redirectTo;
  }

  return `/login?redirect=${encodeURIComponent(pathname)}`;
};

/**
 * Hook to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(getLoginRedirectUrl(redirectTo, pathname));
    }
  }, [user, isLoading, router, redirectTo, pathname]);

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
      router.replace(redirectTo);
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
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(getLoginRedirectUrl(redirectTo, pathname));
      return;
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
      router.replace(forbiddenRedirectTo);
    }
  }, [allowedRoles, forbiddenRedirectTo, isLoading, redirectTo, router, user, pathname]);

  return {
    user,
    isLoading,
    isAuthorized: Boolean(user?.role && allowedRoles.includes(user.role)),
  };
}
