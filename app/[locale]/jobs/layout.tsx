// app/[locale]/jobs/layout.tsx
import { ReactNode } from 'react';
import JobsLayoutClient from './layout-client';

export const metadata = {
  title: 'Job Search | Joe Meléndez',
  description: 'Personal job search dashboard',
  robots: 'noindex, nofollow', // Private section
};

export default function JobsLayout({ children }: { children: ReactNode }) {
  return <JobsLayoutClient>{children}</JobsLayoutClient>;
}
