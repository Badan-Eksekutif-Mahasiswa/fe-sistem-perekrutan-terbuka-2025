import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
const NotFound = () => {
  return (
    <main className="min-h-screen flex text-neutral-100 font-jakarta text-center items-center justify-center">
      <div className="flex flex-col">
        <p className="text-m3">404 Error</p>
        <h1 className="text-7xl/normal tracking-tight font-extrabold">
          Waduh!
        </h1>
        <h3 className="text-m3">Halaman yang kamu cari tidak ditemukan</h3>
        <Link href={"/"}>
          <Button className="mt-4  text-m3" variant={"secondary"}>
            <HomeIcon />
            <span className="text-primary-500">Kembali ke Home</span>
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
