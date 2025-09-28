import Image from "next/image";
import { Button } from "./ui/button";
import { TextAlignEnd } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="w-screen items-center px-4 py-4 font-jakarta text-neutral-100 bg-gradient-to-r from-primary-300 to-primary-400 flex justify-between">
        <div className="flex flex-row gap-2.5 items-center">
          <div className="relative h-10 w-30">
            <Image
              src={"/logo/logo-text.png"}
              alt="Logo SPT"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className=" max-md:hidden flex gap-10 text-lg font-semibold">
          <p className="transition-all duration-300 hover:text-secondary-200 hover:cursor-pointer">
            Daftar
          </p>
          <p className="transition-all duration-300 hover:text-secondary-200 hover:cursor-pointer">
            Perekrutan Terbuka
          </p>
        </div>
        <div className="max-md:hidden">
          <Button className="px-6 py-2">Login</Button>
        </div>

        <div className="min-md:hidden">
          <TextAlignEnd className="w-20 h-10 hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
