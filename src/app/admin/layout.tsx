"use client";

import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/elements/Loader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicAdminPaths = new Set([
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
]);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicAdminPath = publicAdminPaths.has(pathname);

  useEffect(() => {
    if (isPublicAdminPath || isLoading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
      router.replace("/");
    }
  }, [isLoading, isPublicAdminPath, router, user]);

  if (isPublicAdminPath) {
    return <>{children}</>;
  }

  if (
    isLoading ||
    !user ||
    (user.role !== "ADMIN" && user.role !== "SUPERADMIN")
  ) {
    return <Loader />;
  }

  return <div className="pt-24">{children}</div>;
}
