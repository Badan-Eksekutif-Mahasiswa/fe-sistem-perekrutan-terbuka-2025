'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '../atoms/Button';
import DiamondIcon from '../atoms/DiamondIcon';
import { useAuth } from '@/contexts/AuthContext';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavbarProps {
  navLinks?: NavLink[];
  onSignIn?: () => void;
  className?: string;
  signInHref?: string;
}

const getRoleNavLinks = (role?: string | null): NavLink[] => {
  if (role === 'SUPERADMIN') {
    return [
      { href: '/admin', label: 'Home' },
      { href: '/admin/events', label: 'Kelola Event' },
      { href: '/superadmin', label: 'Kelola Akun' },
    ];
  }

  if (role === 'ADMIN') {
    return [
      { href: '/admin', label: 'Home' },
      { href: '/admin/events', label: 'Kelola Event' },
    ];
  }

  if (role === 'APPLICANT') {
    return [
      { href: '/', label: 'Home' },
      { href: '/event', label: 'Recruitment' },
      { href: '/dashboard', label: 'Dashboard' },
    ];
  }

  return [
    { href: '/', label: 'Home' },
    { href: '/event', label: 'Recruitment' },
  ];
};

const hiddenNavbarPaths = new Set([
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
]);

export default function Navbar({
  navLinks,
  onSignIn,
  signInHref = '/login',
  className,
}: NavbarProps) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const activeNavLinks = navLinks ?? getRoleNavLinks(hasMounted ? user?.role : null);
  const showAuthenticatedActions = hasMounted && !!user;
  const showLoadingActions = !hasMounted || isLoading;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      if (currentScrollY < 100) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      if (currentScrollY > lastScrollY + 20) setIsVisible(false);
      else if (currentScrollY < lastScrollY - 10) setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (pathname && hiddenNavbarPaths.has(pathname)) return null;

  const actionButton = showLoadingActions ? (
    <div className="h-9 w-24 animate-pulse rounded-xl bg-white/15" />
  ) : showAuthenticatedActions ? (
    <Button variant="signin" size="sm" onClick={logout} leftIcon={<LogOut size={16} />}>
      Logout
    </Button>
  ) : (
    <Button variant="signin" size="sm" href={signInHref} onClick={onSignIn} leftIcon={<User size={16} />}>
      Sign In
    </Button>
  );

  const mobileActionButton = showLoadingActions ? (
    <div className="h-9 w-full animate-pulse rounded-xl bg-white/15" />
  ) : showAuthenticatedActions ? (
    <Button variant="signin" size="sm" onClick={logout} leftIcon={<LogOut size={16} />} fullWidth>
      Logout
    </Button>
  ) : (
    <Button variant="signin" size="sm" href={signInHref} onClick={onSignIn} leftIcon={<User size={16} />} fullWidth>
      Sign In
    </Button>
  );

  return (
    <nav
      className={cn(
        'w-full px-12 z-50 fixed top-6 max-lg:top-4 max-lg:px-10 max-sm:px-8',
        'transition-all duration-500 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        className,
      )}
      aria-label="Main navigation"
    >
      <div
        className="relative w-full border border-primary-300 rounded-full flex justify-between items-center px-6 py-2 overflow-hidden backdrop-blur-sm"
        style={{ backgroundImage: 'var(--gradient-navbar)' }}
      >
        <Link href="/" aria-label="SPT BEM UI - Beranda">
          <div className="relative z-10 aspect-[188/64] w-30">
            <Image src="/logo.webp" alt="Logo SPT" fill className="object-contain" />
          </div>
        </Link>

        <div className="hidden lg:flex z-10 gap-6 items-center">
          {activeNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-m3 text-white font-jakarta hover:underline group"
            >
              <DiamondIcon size={16} className="group-hover:fill-white" />
              {item.label}
            </Link>
          ))}
          {actionButton}
        </div>

        <button
          className="lg:hidden z-10 p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn('block h-0.5 bg-white rounded transition-all', isMenuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('block h-0.5 bg-white rounded transition-all', isMenuOpen && 'opacity-0')} />
            <span className={cn('block h-0.5 bg-white rounded transition-all', isMenuOpen && '-rotate-45 -translate-y-2')} />
          </div>
        </button>

        <div
          id="mobile-menu"
          className={cn(
            'absolute top-full right-4 mt-2 min-w-44 flex flex-col gap-3 rounded-xl border border-primary-300 p-4 lg:hidden z-50 backdrop-blur-sm',
            'transition-all duration-300 origin-top-right',
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
          )}
          style={{ backgroundImage: 'var(--gradient-navbar)' }}
        >
          {activeNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-m4 text-white font-jakarta hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              <DiamondIcon size={14} />
              {item.label}
            </Link>
          ))}
          {mobileActionButton}
        </div>

        <div className="absolute z-0 pointer-events-none overflow-hidden w-full h-full inset-0 rounded-full" aria-hidden="true">
          <div className="absolute w-48 h-48 -left-6 -top-10 opacity-20">
            <Image src="/assets/spt-pattern.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute w-48 h-48 -right-6 -top-10 opacity-20">
            <Image src="/assets/spt-pattern.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </nav>
  );
}