"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/auth";
import { KeyRound, RotateCcw } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!token) {
      setFeedback({ type: "error", message: "Token reset tidak ditemukan." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: "error", message: "Konfirmasi password tidak sama." });
      return;
    }

    setIsSubmitting(true);
    const response = await authApi.resetPassword(token, newPassword);

    setFeedback({
      type: response.success ? "success" : "error",
      message: response.message || "Reset password selesai.",
    });
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6"
    >
      <div className="mb-6">
        <p className="text-p5 uppercase tracking-normal text-secondary-100">
          Reset Password
        </p>
        <h1 className="mt-2 text-h2">Password Baru</h1>
        <p className="mt-2 text-p5 text-white/65">
          Buat password baru untuk akun internal.
        </p>
      </div>

      <div className="grid gap-4">
        <Input
          required
          minLength={8}
          type="password"
          label="Password baru"
          icon={<KeyRound />}
          value={newPassword}
          placeholder="Minimal 8 karakter"
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Input
          required
          minLength={8}
          type="password"
          label="Konfirmasi password"
          icon={<KeyRound />}
          value={confirmPassword}
          placeholder="Ulangi password baru"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
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

      <Button
        className="mt-5 w-full"
        disabled={isSubmitting}
        type="submit"
        variant="secondary"
      >
        <RotateCcw className="size-4" />
        {isSubmitting ? "Menyimpan..." : "Simpan Password"}
      </Button>

      <Link
        className="mt-4 block text-center text-p5 text-secondary-100 hover:underline"
        href="/internal/spt-admin-2026/login"
      >
        Kembali ke login
      </Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-main)] px-5 text-white">
      <Suspense fallback={null}>
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
