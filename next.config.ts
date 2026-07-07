import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Pastikan folder logo proker ikut ter-bundle saat deploy, sehingga
  // pembacaan folder `public/partners` tetap valid di semua host.
  outputFileTracingIncludes: {
    "/": ["./public/partners/**"],
  },
};

export default nextConfig;
