"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/elements/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { KeyRound, LogIn, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isLoading, internalLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      router.push(user.role === "SUPERADMIN" ? "/superadmin" : "/admin");
    }
  }, [isLoading, router, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await internalLogin(form.email, form.password);
    const loggedInUser = response.data?.user ?? response.user;

    if (response.success && loggedInUser) {
      router.push(
        loggedInUser.role === "SUPERADMIN" ? "/superadmin" : "/admin"
      );
    } else {
      setError(response.message || "Login gagal.");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-main)] px-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6"
      >
        <div className="mb-6">
          <p className="text-p5 uppercase tracking-normal text-secondary-100">
            Login Internal
          </p>
          <h1 className="mt-2 text-h2">Admin dan Panitia</h1>
          <p className="mt-2 text-p5 text-white/65">
            Masuk menggunakan akun internal yang dibuat oleh superadmin.
          </p>
        </div>

        <div className="grid gap-4">
          <Input
            required
            type="email"
            label="Email"
            icon={<Mail />}
            value={form.email}
            placeholder="panitia@bem.ui.ac.id"
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
          <Input
            required
            type="password"
            label="Password"
            icon={<KeyRound />}
            value={form.password}
            placeholder="Password"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
          />
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-200/30 bg-red-300/15 px-4 py-3 text-p5 text-red-100">
            {error}
          </div>
        )}

        <Button
          className="mt-5 w-full"
          disabled={isSubmitting}
          type="submit"
          variant="secondary"
        >
          <LogIn className="size-4" />
          {isSubmitting ? "Masuk..." : "Masuk"}
        </Button>

        <div className="mt-4 text-center text-p5 text-white/65">
          <Link className="text-secondary-100 hover:underline" href="/admin/forgot-password">
            Lupa password?
          </Link>
        </div>
      </form>
    </main>
  );
}
