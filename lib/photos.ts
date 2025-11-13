import fs from 'fs';
import path from 'path';

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Gallery {
  id: string;
  name: string;
  description?: string;
  coverImage: string;
  photos: Photo[];
}

export function getGalleries(): Gallery[] {
  const photosDirectory = path.join(process.cwd(), 'public/photos');

  // Check if photos directory exists
  if (!fs.existsSync(photosDirectory)) {
    return [];
  }

  // Get all folders in the photos directory (excluding hidden folders and README files)
  const galleryFolders = fs.readdirSync(photosDirectory).filter((item) => {
    if (item.startsWith('.') || item === 'README.md') return false;
    const itemPath = path.join(photosDirectory, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const galleries: Gallery[] = galleryFolders.map((folderName) => {
    const galleryPath = path.join(photosDirectory, folderName);

    // Get all image files in the gallery folder
    const imageFiles = fs.readdirSync(galleryPath)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
      })
      .sort(); // Sort alphabetically

    const photos: Photo[] = imageFiles.map((file, index) => ({
      src: `/photos/${folderName}/${file}`,
      alt: `${formatGalleryName(folderName)} - Photo ${index + 1}`,
      caption: undefined,
    }));

    return {
      id: folderName,
      name: formatGalleryName(folderName),
      description: undefined,
      coverImage: photos[0]?.src || '',
      photos,
    };
  });

  return galleries;
}

function formatGalleryName(folderName: string): string {
  return folderName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
