"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className="w-64 text-white flex flex-col p-6 gap-4 z-20 shadow-xl"
        style={{ background: "linear-gradient(to right, #6F82C0 0%, #324173 100%)" }}
      >
        <div className="mb-6 flex flex-col items-center justify-center gap-1">
          <h2 className="text-4xl font-black tracking-widest">S P T</h2>
          <span className="text-2xl font-semibold tracking-wider">BEM UI</span>
        </div>
        <Link href="/admin/events" className="hover:text-secondary-300 text-lg font-medium">
          Dashboard
        </Link>
        <Link href="/admin/profile" className="flex items-center gap-2 hover:text-secondary-300 text-lg font-medium">
          <User className="size-5" /> Profile
        </Link>
        
        <div className="mt-auto flex flex-col gap-4">
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-300 text-left font-bold mt-4">
            <LogOut className="size-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className="flex-1 p-8 overflow-y-auto text-black relative bg-cover bg-fixed"
        style={{ 
          backgroundImage: "url('/hero.webp')",
          backgroundPosition: "calc(50% + 20px) calc(50% - 20px)" 
        }}
      >
        {/* Overlay putih transparan agar teks/konten tetap terbaca */}
        <div className="absolute inset-0 bg-white/40 z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
