// app/[locale]/jobs/layout.tsx
import { ReactNode } from 'react';
import { JobsAuthProvider } from '@/lib/jobs/auth-context';

export const metadata = {
  title: 'Job Search | Joe Meléndez',
  description: 'Personal job search dashboard',
  robots: 'noindex, nofollow', // Private section
};

export default function JobsLayout({ children }: { children: ReactNode }) {
  return (
    <JobsAuthProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </JobsAuthProvider>
  );
}
