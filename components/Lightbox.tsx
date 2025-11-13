'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/lib/photos';

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Previous button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center p-8"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
      >
        <div className="relative w-full h-full select-none">
          <Image
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            fill
            className="object-contain pointer-events-none select-none"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            draggable={false}
            priority
            unoptimized
          />
        </div>

        {/* Caption */}
        {photos[currentIndex].caption && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg px-8">
            {photos[currentIndex].caption}
          </div>
        )}

        {/* Photo counter */}
        <div className="absolute top-4 left-0 right-0 text-center text-white text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Next button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Lightbox;
