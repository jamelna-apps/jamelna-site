import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

/**
 * GET /api/plans - List plans
 * Query params: districtId (optional), limit (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const districtId = searchParams.get('districtId');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    const db = getAdminFirestore();
    let query = db.collection('plans').orderBy('createdAt', 'desc');

    if (districtId) {
      query = query.where('districtId', '==', districtId);
    }

    const snapshot = await query.limit(limit).get();

    const plans = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        version: data.version,
        locale: data.locale,
        districtId: data.districtId,
        executiveSummary: data.executiveSummary,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    });

    return Response.json({ plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/plans - Create a new plan manually
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      districtId,
      locale = 'en',
      scopeSequence,
      curriculumRecommendations,
      implementationRoadmap,
      professionalDevelopment,
      successMetrics,
      executiveSummary,
      districtProfile,
    } = body;

    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }

    const db = getAdminFirestore();

    const planData = {
      title,
      districtId: districtId || null,
      version: 1,
      locale,
      scopeSequence: scopeSequence || [],
      curriculumRecommendations: curriculumRecommendations || [],
      implementationRoadmap: implementationRoadmap || [],
      professionalDevelopment: professionalDevelopment || {},
      successMetrics: successMetrics || {},
      executiveSummary: executiveSummary || '',
      districtProfile: districtProfile || null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('plans').add(planData);

    return Response.json({
      id: docRef.id,
      ...planData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to create plan' },
      { status: 500 }
    );
  }
}
