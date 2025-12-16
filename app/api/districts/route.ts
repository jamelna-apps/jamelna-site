import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { validateDistrictProfile, createValidationErrorResponse } from '@/lib/ai/validation';
import { EnhancedDistrictProfile } from '@/lib/export/templates';

export const runtime = 'nodejs';

/**
 * GET /api/districts - List district profiles
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.general(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const db = getAdminFirestore();
    const snapshot = await db.collection('district_profiles')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const districts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
    }));

    return Response.json({ data: districts });
  } catch (error) {
    console.error('Error listing district profiles:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to list district profiles' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/districts - Create a new district profile
 * Supports both legacy format and enhanced profile format
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.general(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    // Parse input
    const body = await request.json();

    // Detect if this is an enhanced profile (has subjectsTaught field)
    const isEnhancedProfile = 'subjectsTaught' in body || 'implementationTimeline' in body;

    const db = getAdminFirestore();

    if (isEnhancedProfile) {
      // Handle enhanced profile format
      const enhancedProfile = body as Partial<EnhancedDistrictProfile>;

      // Basic validation for enhanced profile
      if (!enhancedProfile.schoolName?.trim()) {
        return Response.json({ error: 'School name is required' }, { status: 400 });
      }
      if (!enhancedProfile.state) {
        return Response.json({ error: 'State is required' }, { status: 400 });
      }
      if (!enhancedProfile.gradeLevels || enhancedProfile.gradeLevels.length === 0) {
        return Response.json({ error: 'At least one grade level is required' }, { status: 400 });
      }

      // Prepare enhanced district data
      const enhancedDistrictData = {
        // Basics
        schoolName: enhancedProfile.schoolName,
        city: enhancedProfile.city || null,
        state: enhancedProfile.state,
        gradeLevels: enhancedProfile.gradeLevels,
        implementationTimeline: enhancedProfile.implementationTimeline || 'exploring',

        // School Structure
        subjectsTaught: enhancedProfile.subjectsTaught || [],
        teacherCounts: enhancedProfile.teacherCounts || { elementary: '0', middle: '0', high: '0' },
        otherStaff: enhancedProfile.otherStaff || [],

        // Current State
        currentCSStatus: enhancedProfile.currentCSStatus || 'none',
        existingActivities: enhancedProfile.existingActivities || [],
        previousPD: enhancedProfile.previousPD || [],

        // Technology
        deviceAvailability: enhancedProfile.deviceAvailability || 'limited',
        deviceTypes: enhancedProfile.deviceTypes || [],
        internetReliability: enhancedProfile.internetReliability || 'moderate',

        // School Culture & Initiatives
        existingInitiatives: enhancedProfile.existingInitiatives || [],
        cultureCharacteristics: enhancedProfile.cultureCharacteristics || [],
        existingPartnerships: enhancedProfile.existingPartnerships || null,

        // Goals & Constraints
        budget: enhancedProfile.budget || 'none',
        primaryGoals: enhancedProfile.primaryGoals || [],
        challenges: enhancedProfile.challenges || [],

        // Pathways
        pathways: enhancedProfile.pathways || [],
        wantFeederPathways: enhancedProfile.wantFeederPathways || false,
        industryPartners: enhancedProfile.industryPartners || null,

        // State Alignment
        stateRequirements: enhancedProfile.stateRequirements || 'notSure',
        alignToStateStandards: enhancedProfile.alignToStateStandards ?? true,

        // Funding & Partnerships
        currentFundingSources: enhancedProfile.currentFundingSources || [],
        grantInterest: enhancedProfile.grantInterest || [],
        seekingPartnerships: enhancedProfile.seekingPartnerships || false,
        partnershipTypes: enhancedProfile.partnershipTypes || [],
        partnershipGoals: enhancedProfile.partnershipGoals || [],
        existingCommunityConnections: enhancedProfile.existingCommunityConnections || null,

        // Metadata
        isEnhanced: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection('district_profiles').add(enhancedDistrictData);

      return Response.json({
        success: true,
        data: {
          id: docRef.id,
          ...enhancedDistrictData,
        },
      }, { status: 201 });
    } else {
      // Handle legacy format
      // Transform the request body to match validation expectations
      const transformedBody = {
        schoolName: body.school_name || body.schoolName,
        city: body.city,
        state: body.state,
        gradeLevels: body.grade_levels || body.gradeLevels || [],
        currentOfferings: body.current_offerings || body.currentOfferings,
        pathways: body.pathways || [],
        resources: body.resources,
      };

      const validationResult = validateDistrictProfile(transformedBody);
      if (!validationResult.valid) {
        return createValidationErrorResponse(validationResult.errors || []);
      }

      const validatedData = validationResult.data!;

      // Save to Firestore
      const districtData = {
        schoolName: validatedData.schoolName,
        city: validatedData.city,
        state: validatedData.state,
        gradeLevels: validatedData.gradeLevels,
        currentOfferings: validatedData.currentOfferings || null,
        pathways: validatedData.pathways || [],
        resources: validatedData.resources || null,
        isEnhanced: false,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection('district_profiles').add(districtData);

      return Response.json({
        success: true,
        data: {
          id: docRef.id,
          ...districtData,
        },
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating district profile:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to create district profile' },
      { status: 500 }
    );
  }
}
