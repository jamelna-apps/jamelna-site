import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

async function getGallery(slug: string) {
  if (!isSanityConfigured || !client) {
    return null;
  }

  try {
    const gallery = await client.fetch(
      `*[_type == "gallery" && slug.current == $slug][0] {
        _id,
        title,
        description,
        photos[] {
          image,
          caption,
          alt
        }
      }`,
      { slug }
    );
    return gallery;
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const gallery = await getGallery(params.slug);

  return {
    title: `${gallery?.title || 'Gallery'} | Photography | Joe Alexander Meléndez-Naharro`,
    description: gallery?.description || 'Photography gallery',
  };
}

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = await getGallery(params.slug);

  if (!gallery) {
    return (
      <div className="min-h-screen bg-canvas">
        <section className="pt-10 pb-8 px-6 bg-canvas-deep">
          <div className="max-w-5xl mx-auto">
            <hr className="heading-rule" />
            <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
              Gallery Not Found
            </h1>
            <Link
              href="/photography"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-terra transition-colors"
            >
              ← Back to Photography
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/photography"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-terra transition-colors mb-8"
          >
            ← Back to Photography
          </Link>
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
            {gallery.title}
          </h1>
          {gallery.description && (
            <p className="text-xl text-text-secondary max-w-2xl">
              {gallery.description}
            </p>
          )}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-6xl mx-auto">
          {gallery.photos && gallery.photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.photos.map((photo: { image: object; alt?: string; caption?: string }, index: number) => (
                <div
                  key={index}
                  className="aspect-square bg-canvas-raised border border-canvas-border rounded-lg overflow-hidden group relative"
                >
                  <Image
                    src={urlFor(photo.image).width(800).height(800).url()}
                    alt={photo.alt || `Photo ${index + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted">No photos in this gallery yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
