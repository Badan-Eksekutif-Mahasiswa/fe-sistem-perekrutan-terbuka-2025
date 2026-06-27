"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => null,
});

export default function ClientNavbar() {
  return <Navbar />;
}
