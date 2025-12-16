import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/plans/[id] - Get a single plan with all details
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();

    const planDoc = await db.collection('plans').doc(id).get();

    if (!planDoc.exists) {
      return Response.json({ error: 'Plan not found' }, { status: 404 });
    }

    const data = planDoc.data();

    return Response.json({
      id: planDoc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/plans/[id] - Update a plan (creates new version)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { createVersion = false, ...updates } = body;

    const db = getAdminFirestore();

    // Get current plan
    const planDoc = await db.collection('plans').doc(id).get();

    if (!planDoc.exists) {
      return Response.json({ error: 'Plan not found' }, { status: 404 });
    }

    const currentData = planDoc.data();

    if (createVersion) {
      // Create a new version by copying to versions subcollection
      const versionData = {
        ...currentData,
        versionNumber: currentData?.version || 1,
        archivedAt: FieldValue.serverTimestamp(),
      };

      await db
        .collection('plans')
        .doc(id)
        .collection('versions')
        .add(versionData);

      // Update with new version number
      updates.version = (currentData?.version || 1) + 1;
    }

    // Apply updates
    const updateData = {
      ...updates,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await db.collection('plans').doc(id).update(updateData);

    // Fetch updated document
    const updatedDoc = await db.collection('plans').doc(id).get();
    const updatedData = updatedDoc.data();

    return Response.json({
      id: updatedDoc.id,
      ...updatedData,
      createdAt: updatedData?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: updatedData?.updatedAt?.toDate?.()?.toISOString() || null,
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to update plan' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/plans/[id] - Delete a plan
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();

    // Check if plan exists
    const planDoc = await db.collection('plans').doc(id).get();

    if (!planDoc.exists) {
      return Response.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Delete all versions first
    const versionsSnapshot = await db
      .collection('plans')
      .doc(id)
      .collection('versions')
      .get();

    const batch = db.batch();

    versionsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete the plan document
    batch.delete(db.collection('plans').doc(id));

    await batch.commit();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
