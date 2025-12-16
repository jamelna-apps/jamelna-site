'use client';

import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section className="min-h-screen relative overflow-hidden py-24 bg-deep">
      {/* Gradient background accents */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(143, 168, 200, 0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201, 112, 77, 0.3), transparent)' }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default PageWrapper;
