// components/jobs/JobsNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useJobsAuth } from '@/lib/jobs/auth-context';

const navItems = [
  { href: '/jobs', label: 'Dashboard', icon: '📊' },
  { href: '/jobs/all', label: 'All Jobs', icon: '💼' },
  { href: '/jobs/profile', label: 'Profile', icon: '👤' },
  // Phase 2+: Applications, Sources, Settings
];

export default function JobsNav() {
  const pathname = usePathname();
  const { user, logout } = useJobsAuth();

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center">
            <Link href={`/${locale}/jobs`} className="text-xl font-bold text-gray-900">
              Job Search
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const fullPath = `/${locale}${item.href}`;
              const isActive = pathname === fullPath ||
                (item.href !== '/jobs' && pathname.startsWith(fullPath));

              return (
                <Link
                  key={item.href}
                  href={fullPath}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex overflow-x-auto py-2 px-4 space-x-2">
          {navItems.map((item) => {
            const fullPath = `/${locale}${item.href}`;
            const isActive = pathname === fullPath;

            return (
              <Link
                key={item.href}
                href={fullPath}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
