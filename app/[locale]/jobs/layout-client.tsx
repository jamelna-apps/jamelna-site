// app/[locale]/jobs/layout-client.tsx
'use client';

import { ReactNode } from 'react';
import { JobsAuthProvider, useJobsAuth } from '@/lib/jobs/auth-context';
import JobsNav from '@/components/jobs/JobsNav';
import ChatWidget from '@/components/jobs/ChatWidget';

function LayoutContent({ children }: { children: ReactNode }) {
  const { user, loading } = useJobsAuth();

  // Show nav only when user is logged in
  const showNav = !loading && user;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {showNav && <JobsNav />}
      <main className={showNav ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""}>
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}

export default function JobsLayoutClient({ children }: { children: ReactNode }) {
  return (
    <JobsAuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </JobsAuthProvider>
  );
}
