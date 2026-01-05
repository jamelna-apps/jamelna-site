// components/jobs/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import JobsNav from './JobsNav';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useJobsAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/jobs/login`);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <JobsNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </>
  );
}
