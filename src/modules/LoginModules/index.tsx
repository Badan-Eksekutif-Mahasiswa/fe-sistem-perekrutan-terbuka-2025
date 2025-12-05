"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRedirectIfAuth } from "@/hooks/useAuth";
import { AuthLoading, LoadingSpinner } from "@/components/ui/loading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Sistem Perekrutan Terbuka
          </h1>
          <p className="text-gray-600">
            Masuk menggunakan akun Universitas Indonesia
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={isLoginLoading}
            className="w-full h-12 text-lg"
          >
            {isLoginLoading ? (
              <>
                <LoadingSpinner size="sm" className="border-white mr-2" />
                Mengarahkan ke UI SSO...
              </>
            ) : (
              "Login dengan UI SSO"
            )}
          </Button>

          <div className="text-sm text-gray-500 text-center">
            <p>
              Dengan masuk, Anda akan diarahkan ke sistem Single Sign-On (SSO)
              Universitas Indonesia untuk verifikasi identitas.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-400 text-center">
            <p>
              Hanya mahasiswa Universitas Indonesia yang dapat mengakses sistem
              ini.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginModules;
