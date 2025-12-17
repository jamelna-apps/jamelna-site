import { createClient, SanityClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Validate projectId format: only a-z, 0-9, and dashes allowed
const isValidProjectId = projectId && /^[a-z0-9-]+$/.test(projectId);

export const isSanityConfigured = Boolean(isValidProjectId);

// Only create a real client if Sanity is properly configured
// This prevents build errors when env vars are not set or invalid
export const client: SanityClient | null = isValidProjectId
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;
