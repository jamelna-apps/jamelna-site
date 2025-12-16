import React from 'react';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-neutral-800 mb-8 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" size="md">
            Go Home
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
