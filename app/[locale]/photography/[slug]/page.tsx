import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

async function getGallery(slug: string) {
  if (!isSanityConfigured) {
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
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Gallery Not Found</h1>
          <Link href="/photography" className="text-gray-800 hover:text-gray-900">
            ← Back to Photography
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/photography"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8 inline-block"
          >
            ← Back to Photography
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            {gallery.title}
          </h1>
          {gallery.description && (
            <p className="text-lg text-gray-800 font-light max-w-3xl">
              {gallery.description}
            </p>
          )}
        </div>

        {/* Photo Grid */}
        {gallery.photos && gallery.photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.photos.map((photo: any, index: number) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative"
              >
                <Image
                  src={urlFor(photo.image).width(800).height(800).url()}
                  alt={photo.alt || `Photo ${index + 1}`}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-light">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 font-light">No photos in this gallery yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
