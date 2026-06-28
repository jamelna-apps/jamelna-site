'use client';

import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section className="min-h-screen pt-10 pb-16 px-6 bg-canvas-deep">
      {/* Content Container */}
      <div className="w-full max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default PageWrapper;
