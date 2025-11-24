"use client";
import Image from "next/legacy/image";
import { Button } from "../../ui/button";
import { User, Diamond } from "lucide-react";
import Link from "next/link";
import { data } from "./const";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Hanya reageer jika scroll difference minimal 10px untuk menghindari jitter
      if (scrollDifference < 10) return;

      // Jika scroll position di atas 100px, selalu tampilkan navbar
      if (currentScrollY < 100) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Jika scroll ke bawah dengan jarak yang cukup, sembunyikan navbar dengan delay
      if (currentScrollY > lastScrollY + 20) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 150); // Delay 150ms sebelum menyembunyikan
        setScrollTimeout(timeout);
      }
      // Jika scroll ke atas, langsung tampilkan navbar
      else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <>
      <nav
        className={`w-full px-12 z-100 fixed top-6 max-lg:top-4 max-lg:px-10 max-sm:px-8 transition-all duration-500 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="relative w-full border border-primary-300 bg-gradient-card rounded-full flex justify-between items-center px-6 py-2">
          <div className="relative z-1 aspect-[188/64] w-30">
            <Image
              src="/logo.webp"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="flex z-1 gap-6 max-lg:hidden">
            <Menu />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-1 p-2 rounded-lg hover:bg-primary-300/20 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={`
            absolute py-3 px-4 min-w-40 flex flex-col gap-4 rounded-xl border border-primary-300 bg-gradient-card bg-primary-300 
            -bottom-2 translate-y-full right-6 max-lg:right-4 lg:hidden z-50
            transition-all duration-300 ease-in-out transform origin-top-right
            ${
              isMenuOpen
                ? "opacity-100 scale-100 translate-y-full"
                : "opacity-0 scale-95 translate-y-[calc(100%-8px)] pointer-events-none"
            }
          `}
          >
            <Menu />
          </div>

          {/* Background */}
          <div className="absolute z-0 overflow-hidden w-full h-full">
            <div className="absolute w-50 h-50 -left-5  -translate-y-20">
              <Image
                src="/assets/puzzle.webp"
                alt="Background"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

const Menu = () => {
  return (
    <>
      {data.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex group hover:underline items-center gap-2 text-m3 max-lg:text-m4 text-neutral-50"
        >
          <Diamond className="w-4 h-4 group-hover:fill-white" />
          {item.title}
        </Link>
      ))}
      <Button variant="secondary" className="max-lg:w-full">
        <User />
        Sign in
      </Button>
    </>
  );
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-end space-y-1">
      <span
        className={`
          block h-0.5 w-4 bg-neutral-50 transform rounded-full transition-all duration-300 ease-in-out origin-center
          ${isOpen ? "rotate-45 translate-y-1.5 w-6" : "rotate-0 translate-y-0"}
        `}
      />
      <span
        className={`
          block h-0.5 w-6 bg-neutral-50 transform rounded-full transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}
        `}
      />
      <span
        className={`
          block h-0.5 w-5 bg-neutral-50 transform rounded-full transition-all duration-300 ease-in-out origin-center
          ${
            isOpen
              ? "-rotate-45 -translate-y-1.5 w-6"
              : "rotate-0 translate-y-0"
          }
        `}
      />
    </div>
  );
};
