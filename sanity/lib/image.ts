import imageUrlBuilder from '@sanity/image-url';
import { client, isSanityConfigured } from './client';

// Only create builder if Sanity is configured
const builder = isSanityConfigured && client ? imageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder) {
    // Return a placeholder that won't break rendering
    return {
      url: () => '/placeholder.jpg',
      width: () => ({ url: () => '/placeholder.jpg', height: () => ({ url: () => '/placeholder.jpg' }) }),
      height: () => ({ url: () => '/placeholder.jpg', width: () => ({ url: () => '/placeholder.jpg' }) }),
    };
  }
  return builder.image(source);
}
