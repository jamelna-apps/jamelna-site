# Photography Galleries

This folder contains your photography galleries. Each subfolder becomes a gallery on the photography page.

## How to Add a Gallery

1. Create a new folder in this directory (e.g., `my-travel-photos`)
2. Add your photos to that folder (supports: .jpg, .jpeg, .png, .webp, .gif)
3. The folder name will become the gallery title (dashes convert to spaces, first letter capitalized)

### Example Structure:
```
public/photos/
├── spain-2024/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── portraits/
│   ├── image1.jpg
│   └── image2.jpg
└── README.md (this file)
```

This will create two galleries:
- "Spain 2024" (with 3 photos)
- "Portraits" (with 2 photos)

## Photo Protection

The gallery includes these download protection features:
- Right-click disabled on images
- Drag-and-drop disabled
- CSS to prevent easy selection
- `pointer-events-none` on images

**Note:** While these features make it harder to download images, determined users can still access them through browser developer tools. For stronger protection, consider:
- Adding watermarks to images
- Using lower resolution versions for web display
- Implementing a proper paid gallery system

## Folder Naming Tips

- Use lowercase with dashes for folder names: `my-gallery-name`
- The system automatically converts dashes to spaces and capitalizes words
- Examples:
  - `new-york` → "New York"
  - `family-portraits` → "Family Portraits"
  - `landscape-photography` → "Landscape Photography"

## Photo Order

Photos are displayed in alphabetical order by filename. To control the order:
- Prefix filenames with numbers: `01-sunset.jpg`, `02-sunrise.jpg`, etc.
- Use ISO date format: `2024-01-15-beach.jpg`
