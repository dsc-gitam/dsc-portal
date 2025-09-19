"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setUpProviders();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary via-secondary to-success rounded-full"></div>
              <h1 className="text-xl font-semibold text-gray-900">DSC GITAM Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/recruitment" className="text-gray-700 hover:text-primary transition-colors">
                Recruitment
              </Link>
              <Link href="/auth/signin" className="text-primary font-medium">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-success rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">DSC</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Sign in to <span className="text-primary">DSC Portal</span>
          </h1>
          <p className="text-gray-600">
            Use your GITAM email address to access the portal
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
          {providers &&
            Object.values(providers).map((provider: Provider) => (
              <div key={provider.name} className="space-y-4">
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center shadow-sm"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            ))}

          {!providers && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading...</p>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              You must use your official GITAM email address (@gitam.in)
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Only GITAM students and faculty can access this portal
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Your information will be used solely for DSC recruitment purposes
            </li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/"
            className="text-primary hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">DSC GITAM © 2025</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}