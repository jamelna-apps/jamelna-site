import { createClient, SanityClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

// Only create a real client if Sanity is configured
// This prevents build errors when env vars are not set
export const client: SanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : (null as unknown as SanityClient);
