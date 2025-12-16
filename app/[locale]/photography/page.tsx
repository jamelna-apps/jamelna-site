'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PageWrapper from '@/components/PageWrapper';
import Lightbox from '@/components/Lightbox';
import { useTranslations } from 'next-intl';
import { Gallery } from '@/lib/photos';

export default function PhotographyPage() {
  const t = useTranslations('photography');
  const [galleries, setGalleries] = React.useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/galleries')
      .then((res) => res.json())
      .then((data) => {
        setGalleries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch galleries:', error);
        setLoading(false);
      });
  }, []);

  const openLightbox = (gallery: Gallery, photoIndex: number) => {
    setSelectedGallery(gallery);
    setLightboxIndex(photoIndex);
  };

  const closeLightbox = () => {
    setSelectedGallery(null);
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
            <span className="text-warm">/</span> {t('title')}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Loading galleries...
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (galleries.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
            <span className="text-warm">/</span> {t('title')}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8">
            <h2 className="text-xl font-display font-bold text-text-heading mb-4">Getting Started</h2>
            <p className="text-sm text-text-secondary mb-4">
              To add photography galleries, create folders in <code className="bg-deep-card px-2 py-1 rounded text-primary">public/photos/</code>
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
              <li>Create a folder in <code className="bg-deep-card px-1 rounded text-primary">public/photos/</code> (e.g., <code className="bg-deep-card px-1 rounded text-primary">my-gallery</code>)</li>
              <li>Add your photos to that folder (supports .jpg, .jpeg, .png, .webp, .gif)</li>
              <li>Refresh this page to see your gallery!</li>
            </ol>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
          <span className="text-warm">/</span> {t('title')}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Galleries */}
      <div className="space-y-20">
        {galleries.map((gallery) => (
          <div key={gallery.id}>
            <h2 className="text-3xl font-display font-bold text-text-heading mb-4">{gallery.name}</h2>
            {gallery.description && (
              <p className="text-lg text-text-secondary mb-8">{gallery.description}</p>
            )}

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(gallery, index)}
                  className="aspect-square bg-deep-card rounded-lg overflow-hidden group cursor-pointer border border-deep-border hover:border-warm/50 transition-colors"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    draggable={false}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedGallery && (
        <Lightbox
          photos={selectedGallery.photos}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </PageWrapper>
  );
}
