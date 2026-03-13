import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

interface CreateConversationRequest {
  districtId?: string;
  planId?: string;
  locale?: string;
}

/**
 * GET /api/conversations - List conversations
 * Query params: districtId (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const districtId = searchParams.get('districtId');

    const db = getAdminFirestore();
    let query = db.collection('conversations').orderBy('createdAt', 'desc');

    if (districtId) {
      query = query.where('districtId', '==', districtId);
    }

    const snapshot = await query.limit(50).get();

    const conversations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    return Response.json({ conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/conversations - Create a new conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateConversationRequest = await request.json();
    const { districtId, planId, locale = 'en' } = body;

    const db = getAdminFirestore();

    const conversationData = {
      districtId: districtId || null,
      planId: planId || null,
      locale,
      messageCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('conversations').add(conversationData);

    return Response.json({
      id: docRef.id,
      ...conversationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
