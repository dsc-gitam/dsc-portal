"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <Image
              src="/gdgoc_logo.png"
              alt="GDGoC Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <Image
              src="/GDG-Lockup-1Line-Black.png"
              alt="Google Developer Groups on Campus"
              width={200}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              Home
            </Link>
            <Link href="/recruitment" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              Recruitment
            </Link>
            {status === "loading" ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Image
                      src={session.user?.image || "/default-avatar.png"}
                      alt={session.user?.name || "Profile"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{session.user?.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/recruitment"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        My Application
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md font-medium text-sm">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}