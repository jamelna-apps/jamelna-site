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
    <nav className="border-b" style={{ background: 'rgba(44, 44, 46, 0.6)', borderColor: 'rgba(56, 56, 58, 0.5)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center">
            <Link href={`/${locale}/jobs`} className="text-xl font-bold text-white">
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
                      ? 'text-[#00a8ff]'
                      : 'text-[#D1D1D6] hover:text-white'
                  }`}
                  style={isActive ? { background: 'rgba(0, 168, 255, 0.15)' } : {}}
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
                <span className="text-sm text-[#D1D1D6]">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-[#636366] hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
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
                    ? 'text-[#00a8ff]'
                    : 'text-[#D1D1D6]'
                }`}
                style={{ background: isActive ? 'rgba(0, 168, 255, 0.15)' : 'rgba(44, 44, 46, 0.6)' }}
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
