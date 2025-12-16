import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';

export const runtime = 'nodejs';

/**
 * GET /api/districts/[id] - Get a specific district profile
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.general(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const { id } = await params;
    const db = getAdminFirestore();
    const docRef = db.collection('district_profiles').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return Response.json(
        { error: 'District profile not found' },
        { status: 404 }
      );
    }

    const data = doc.data();
    return Response.json({
      data: {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data?.updatedAt?.toDate?.()?.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching district profile:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch district profile' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/districts/[id] - Update a district profile
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.general(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const { id } = await params;
    const body = await request.json();
    const db = getAdminFirestore();
    const docRef = db.collection('district_profiles').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return Response.json(
        { error: 'District profile not found' },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Only include fields that are provided
    if (body.schoolName !== undefined) updateData.schoolName = body.schoolName;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.state !== undefined) updateData.state = body.state;
    if (body.gradeLevels !== undefined) updateData.gradeLevels = body.gradeLevels;
    if (body.currentOfferings !== undefined) updateData.currentOfferings = body.currentOfferings;
    if (body.pathways !== undefined) updateData.pathways = body.pathways;
    if (body.resources !== undefined) updateData.resources = body.resources;

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();

    return Response.json({
      data: {
        id: updatedDoc.id,
        ...updatedData,
        createdAt: updatedData?.createdAt?.toDate?.()?.toISOString(),
        updatedAt: updatedData?.updatedAt?.toDate?.()?.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating district profile:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to update district profile' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/districts/[id] - Delete a district profile
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.general(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const { id } = await params;
    const db = getAdminFirestore();
    const docRef = db.collection('district_profiles').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return Response.json(
        { error: 'District profile not found' },
        { status: 404 }
      );
    }

    await docRef.delete();

    return Response.json({ message: 'District profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting district profile:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to delete district profile' },
      { status: 500 }
    );
  }
}
