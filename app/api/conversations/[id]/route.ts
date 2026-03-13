import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/conversations/[id] - Get conversation with messages
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();

    // Get conversation
    const conversationDoc = await db.collection('conversations').doc(id).get();

    if (!conversationDoc.exists) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const conversationData = conversationDoc.data();

    // Get messages subcollection
    const messagesSnapshot = await db
      .collection('conversations')
      .doc(id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get();

    const messages: Message[] = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      role: doc.data().role,
      content: doc.data().content,
      metadata: doc.data().metadata || {},
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return Response.json({
      id: conversationDoc.id,
      ...conversationData,
      createdAt: conversationData?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: conversationData?.updatedAt?.toDate?.()?.toISOString() || null,
      messages,
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/conversations/[id] - Add a message to conversation
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { role, content, metadata } = body;

    if (!role || !content) {
      return Response.json(
        { error: 'Role and content are required' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();

    // Verify conversation exists
    const conversationDoc = await db.collection('conversations').doc(id).get();
    if (!conversationDoc.exists) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Add message to subcollection
    const messageData = {
      role,
      content,
      metadata: metadata || {},
      createdAt: FieldValue.serverTimestamp(),
    };

    const messageRef = await db
      .collection('conversations')
      .doc(id)
      .collection('messages')
      .add(messageData);

    // Update conversation's message count and timestamp
    await db.collection('conversations').doc(id).update({
      messageCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return Response.json({
      id: messageRef.id,
      ...messageData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error adding message:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to add message' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/conversations/[id] - Delete a conversation
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const db = getAdminFirestore();

    // Get all messages in the conversation
    const messagesSnapshot = await db
      .collection('conversations')
      .doc(id)
      .collection('messages')
      .get();

    // Delete all messages
    const batch = db.batch();
    messagesSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete the conversation document
    batch.delete(db.collection('conversations').doc(id));

    await batch.commit();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}
