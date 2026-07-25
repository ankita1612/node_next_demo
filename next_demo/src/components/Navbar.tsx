'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  activeColor?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  activeColor = 'border-indigo-600 text-indigo-600 bg-indigo-50/50',
  exact = false,
}) => {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`px-4 py-2 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${isActive
        ? activeColor
        : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`}
    >
      {children}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Title & NavLinks aligned left */}
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none flex-shrink-0">
            Demo Portal
          </h1>


        </div>

        {/* Right Side: Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          ` <nav className="flex items-center gap-1">
            <NavLink href="/dashboard">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink href="/employees">
              <Users className="w-4 h-4" />
              <span>Employee CRUD</span>
            </NavLink>

            <NavLink href="/posts" activeColor="border-purple-600 text-purple-600 bg-purple-50/50">
              <FileText className="w-4 h-4" />
              <span>Post CRUD</span>
            </NavLink>
          </nav>`
        </div>
      </div>
    </header>
  );
};
