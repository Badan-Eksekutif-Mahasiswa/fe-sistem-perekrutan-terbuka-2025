"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";
import { useRequireAuth } from "@/hooks/useAuth";
import { authApi } from "@/lib/auth";
import { Mail, Send } from "lucide-react";

export default function ChangePasswordPage() {
  const { user, isLoading } = useRequireAuth("/internal/spt-admin-2026/login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const handleRequestReset = async () => {
    if (!user?.email) {
      setFeedback({
        type: "error",
        message: "Email akun tidak tersedia.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    setResetUrl(null);

    const response = await authApi.forgotPassword(user.email);

    setFeedback({
      type: response.success ? "success" : "error",
      message:
        response.message ||
        "Jika email terdaftar, instruksi reset password akan dikirim.",
    });
    setResetUrl(response.data?.resetUrl || null);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-main)] px-5 text-white">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6">
        <div className="mb-6">
          <p className="text-p5 uppercase tracking-normal text-secondary-100">
            Akun Internal
          </p>
          <h1 className="mt-2 text-h2">Ubah Password</h1>
          <p className="mt-2 text-p5 text-white/65">
            Sistem akan mengirim token reset ke email akun internal.
          </p>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-3">
            <Mail className="size-4 text-secondary-100" />
            <div>
              <p className="text-p6 text-white/55">Email tujuan</p>
              <p className="text-p5 font-semibold">{user.email || "-"}</p>
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`mt-4 rounded-md border px-4 py-3 text-p5 ${
              feedback.type === "success"
                ? "border-green-200/30 bg-green-300/15 text-green-100"
                : "border-red-200/30 bg-red-300/15 text-red-100"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {resetUrl && (
          <div className="mt-3 rounded-md border border-yellow-200/30 bg-yellow-300/15 px-4 py-3 text-p5 text-yellow-100">
            Link development:{" "}
            <Link className="break-all underline" href={resetUrl}>
              {resetUrl}
            </Link>
          </div>
        )}

        <Button
          className="mt-5 w-full"
          disabled={isSubmitting}
          onClick={handleRequestReset}
          type="button"
          variant="secondary"
        >
          <Send className="size-4" />
          {isSubmitting ? "Mengirim..." : "Kirim Link Ubah Password"}
        </Button>

        <Link
          className="mt-4 block text-center text-p5 text-secondary-100 hover:underline"
          href={user.role === "SUPERADMIN" ? "/superadmin" : "/admin"}
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}
