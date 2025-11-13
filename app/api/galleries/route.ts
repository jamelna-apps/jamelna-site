import { NextResponse } from 'next/server';
import { getGalleries } from '@/lib/photos';

export async function GET() {
  try {
    const galleries = getGalleries();
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json([], { status: 500 });
  }
}
