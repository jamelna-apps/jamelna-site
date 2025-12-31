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
      <main className="min-h-screen bg-zinc-900 pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)' }} />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              <span className="text-emerald-400">/</span> {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Loading galleries...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (galleries.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-900 pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)' }} />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              <span className="text-emerald-400">/</span> {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-12 px-4 bg-zinc-950">
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8">
              <h2 className="text-xl font-display font-bold text-white mb-4">Getting Started</h2>
              <p className="text-sm text-zinc-400 mb-4">
                To add photography galleries, create folders in <code className="bg-zinc-900 px-2 py-1 rounded text-emerald-400">public/photos/</code>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
                <li>Create a folder in <code className="bg-zinc-900 px-1 rounded text-emerald-400">public/photos/</code> (e.g., <code className="bg-zinc-900 px-1 rounded text-emerald-400">my-gallery</code>)</li>
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
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <span className="text-emerald-400">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Galleries */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto space-y-20">
          {galleries.map((gallery) => (
            <div key={gallery.id}>
              <h2 className="text-3xl font-display font-bold text-white mb-4">{gallery.name}</h2>
              {gallery.description && (
                <p className="text-lg text-zinc-400 mb-8">{gallery.description}</p>
              )}

              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(gallery, index)}
                    className="aspect-square bg-zinc-800 rounded-lg overflow-hidden group cursor-pointer border border-zinc-700 hover:border-emerald-500/50 transition-colors"
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
