"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRedirectIfAuth } from "@/hooks/useAuth";
import { AuthLoading, LoadingSpinner } from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const LoginModules = () => {
  const { login, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Redirect if already authenticated
  useRedirectIfAuth("/dashboard");

  // Get redirect path from URL params (for post-login redirect)
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const handleLogin = () => {
    setIsLoginLoading(true);
    login(redirectPath);
  };

  // Handle potential error messages from URL params (if SSO fails)
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      // Handle error display if needed
      console.error("Login error:", error);
    }
  }, [searchParams]);

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Button onClick={handleLogin} disabled={isLoginLoading}>
        {isLoginLoading ? (
          <>
            <LoadingSpinner size="sm" className="border-white mr-2" />
            Mengarahkan ke UI SSO...
          </>
        ) : (
          <>
            <Image
              src="/logo-UI.png"
              alt="Login with SSO"
              width={20}
              height={20}
            />
            <span>Login with SSO UI</span>
          </>
        )}
      </Button>
    </main>
  );
};

export default LoginModules;
