'use client';

import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section className="min-h-screen py-24 bg-canvas-deep">
      {/* Content Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default PageWrapper;
