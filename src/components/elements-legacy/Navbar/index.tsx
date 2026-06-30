"use client";
import Image from "next/legacy/image";
import Button from "@/design-system/components/atoms/Button";
import { User, Diamond, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const hiddenNavbarPaths = new Set([
  "/internal/spt-admin-2026/login",
  "/internal/spt-admin-2026/forgot-password",
  "/internal/spt-admin-2026/reset-password",
]);

const Navbar = () => {
  const pathname = usePathname();
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

  if (pathname && hiddenNavbarPaths.has(pathname)) return null;

  return (
    <>
      <nav
        className={`w-full px-12 z-100 fixed top-6 max-lg:top-4 max-lg:px-10 max-sm:px-8 transition-all duration-500 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="relative">
          <div className="relative w-full rounded-full flex justify-between items-center px-6 py-2 backdrop-blur-md overflow-hidden" style={{ backgroundImage: 'var(--gradient-navbar)', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', backdropFilter: 'blur(12px) saturate(180%)' }}>
            <div className="relative z-1 aspect-188/64 w-36">
              <Image
                src="/logo/logo-text.png"
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

            {/* Background pattern */}
            <div className="absolute z-0 pointer-events-none w-full h-full inset-0" aria-hidden="true">
              <div className="absolute w-48 h-48 -left-6 -top-10 opacity-20">
                <Image src="/assets/spt-pattern.png" alt="" layout="fill" objectFit="contain" />
              </div>
              <div className="absolute w-48 h-48 -right-6 -top-10 opacity-20">
                <Image src="/assets/spt-pattern.png" alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown — outside overflow-hidden pill */}
          <div
            className={`absolute top-full right-4 mt-2 py-3 px-4 min-w-40 flex flex-col gap-4 rounded-xl border border-primary-300 backdrop-blur-sm lg:hidden z-50 transition-all duration-300 ease-in-out transform origin-top-right ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            style={{ backgroundImage: 'var(--gradient-navbar)' }}
          >
            <Menu />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

const Menu = () => {
  const { user, logout, isLoading } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const navigationLinks = (() => {
    if (user?.role === "SUPERADMIN") {
      return [
        { title: "Home", href: "/admin" },
        { title: "Kelola Event", href: "/admin/events" },
        { title: "Kelola Akun", href: "/superadmin" },
      ];
    }

    if (user?.role === "ADMIN") {
      return [
        { title: "Home", href: "/admin" },
        { title: "Kelola Event", href: "/admin/events" },
      ];
    }

    if (user?.role === "APPLICANT") {
      return [
        { title: "Home", href: "/" },
        { title: "Recruitment", href: "/event" },
        { title: "Dashboard", href: "/dashboard" },
      ];
    }

    return [
      { title: "Home", href: "/" },
      { title: "Recruitment", href: "/event" },
    ];
  })();
  if (!hasMounted) {
    return <div className="h-8 w-48 animate-pulse rounded-md bg-white/15" />;
  }

  return (
    <>
      {navigationLinks.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex group hover:underline items-center gap-2 text-m3 max-lg:text-m4 text-neutral-50"
        >
          <Diamond className="w-4 h-4 group-hover:fill-white" />
          {item.title}
        </Link>
      ))}

      {/* Authentication Section */}
      {isLoading ? (
        <div className="w-20 h-8 bg-gray-300 animate-pulse rounded-md"></div>
      ) : user ? (
        <Button variant="signin" size="sm" onClick={handleLogout} leftIcon={<LogOut size={16} />}>
          Logout
        </Button>
      ) : (
        <Button variant="signin" size="sm" href="/login" leftIcon={<User size={16} />}>
          Sign in
        </Button>
      )}
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
