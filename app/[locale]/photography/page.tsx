'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
      <main className="min-h-screen bg-canvas pt-16">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-canvas-deep">
          <div className="max-w-5xl mx-auto">
            <hr className="heading-rule" />
            <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl">
              Loading galleries...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (galleries.length === 0) {
    return (
      <main className="min-h-screen bg-canvas pt-16">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-canvas-deep">
          <div className="max-w-5xl mx-auto">
            <hr className="heading-rule" />
            <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl">
              {t('description')}
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-12 px-4 bg-canvas-deep">
          <div className="max-w-2xl mx-auto">
            <div className="bg-canvas-raised border border-canvas-border rounded-lg p-8">
              <h2 className="text-xl font-display font-bold text-text-heading mb-4">Getting Started</h2>
              <p className="text-sm text-text-secondary mb-4">
                To add photography galleries, create folders in <code className="bg-canvas px-2 py-1 rounded text-terra">public/photos/</code>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Create a folder in <code className="bg-canvas px-1 rounded text-terra">public/photos/</code> (e.g., <code className="bg-canvas px-1 rounded text-terra">my-gallery</code>)</li>
                <li>Add your photos to that folder (supports .jpg, .jpeg, .png, .webp, .gif)</li>
                <li>Refresh this page to see your gallery!</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas pt-16">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Galleries */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-6xl mx-auto space-y-20">
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
                    className="aspect-square bg-canvas-raised rounded-lg overflow-hidden group cursor-pointer border border-canvas-border hover:border-terra/50 transition-colors"
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
      </section>

      {/* Lightbox */}
      {selectedGallery && (
        <Lightbox
          photos={selectedGallery.photos}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </main>
  );
}
