'use client';

import React from 'react';
import Image from 'next/image';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden py-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/photos/bridge.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White Content Block */}
        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg shadow-lg overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageWrapper;
