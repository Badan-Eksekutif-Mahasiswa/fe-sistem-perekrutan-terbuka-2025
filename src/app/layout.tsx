import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/elements-legacy/Navbar/ClientNavbar";
import Footer from "@/components/elements-legacy/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Perekrutan Terbuka",
  description: "Sistem Perekrutan Terbuka BEM UI",
  icons: {
    icon: "/assets/logo-spt-icon.png",
    shortcut: "/assets/logo-spt-icon.png",
    apple: "/assets/logo-spt-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} antialiased font-jakarta`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />

          <Toaster position="top-right" expand={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
