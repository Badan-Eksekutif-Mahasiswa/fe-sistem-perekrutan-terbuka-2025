"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/elements/Loader";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-500 text-white flex flex-col p-6 gap-4">
        <h2 className="text-h4 font-bold mb-6">Admin Panel</h2>
        <Link href="/admin/events" className="hover:text-secondary-300">
          Kelola Event
        </Link>
        <Link href="/" className="hover:text-secondary-300 mt-auto">
          Kembali ke Web
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-neutral-50 p-8 overflow-y-auto text-black">
        {children}
      </main>
    </div>
  );
}
