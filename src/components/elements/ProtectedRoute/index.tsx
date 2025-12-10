"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/elements/Loader";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login page
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Loader />;
  }

  return <>{children}</>;
}
