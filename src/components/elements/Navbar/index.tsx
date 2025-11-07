import Image from "next/image";
import { Button } from "../../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { Diamond } from "lucide-react";
import { data } from "./const";

const Navbar = () => {
  return (
    <>
      <div className="w-full px-12 max-lg:px-10 max-sm:px-8 pt-6 max-lg:pt-4">
        <div className="w-full border border-primary-300 bg-gradient-card rounded-full flex justify-between items-center px-6 py-2 bg-">
          <div className="relative aspect-[188/64] w-30">
            <Image
              src="/logo.webp"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex gap-6">
            {data.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex group items-center gap-2 text-m3 text-neutral-50"
              >
                <Diamond className="w-4 h-4 group-hover:fill-white" />
                {item.title}
              </Link>
            ))}
            <Button variant="secondary">
              <User />
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
