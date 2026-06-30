"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/auth";
import { Mail, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const response = await authApi.forgotPassword(email);
    setMessage(
      response.message ||
        "Jika email terdaftar, instruksi reset password akan dikirim."
    );

    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-main)] px-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6"
      >
        <div className="mb-6">
          <p className="text-p5 uppercase tracking-normal text-secondary-100">
            Reset Password
          </p>
          <h1 className="mt-2 text-h2">Lupa Password</h1>
          <p className="mt-2 text-p5 text-white/65">
            Masukkan email akun internal panitia atau superadmin.
          </p>
        </div>

        <Input
          required
          type="email"
          label="Email"
          icon={<Mail />}
          value={email}
          placeholder="panitia@bem.ui.ac.id"
          onChange={(event) => setEmail(event.target.value)}
        />

        {message && (
          <div className="mt-4 rounded-md border border-green-200/30 bg-green-300/15 px-4 py-3 text-p5 text-green-100">
            {message}
          </div>
        )}



        <Button
          className="mt-5 w-full"
          disabled={isSubmitting}
          type="submit"
          variant="secondary"
        >
          <Send className="size-4" />
          {isSubmitting ? "Mengirim..." : "Kirim Instruksi"}
        </Button>

        <Link
          className="mt-4 block text-center text-p5 text-secondary-100 hover:underline"
          href="/internal/spt-admin-2026/login"
        >
          Kembali ke login
        </Link>
      </form>
    </main>
  );
}
