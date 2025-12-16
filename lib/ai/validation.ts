/**
 * Input validation and sanitization for AI planner endpoints
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Sanitize string input - remove potential XSS vectors
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';

  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script injection attempts
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    // Limit to reasonable length
    .slice(0, 10000);
}

/**
 * Validate district profile input
 */
export interface DistrictProfileInput {
  schoolName: string;
  city: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways?: string[];
  resources?: string;
}

const VALID_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico'
];

const VALID_GRADE_LEVELS = ['elementary', 'middle', 'high', 'K-2', 'K-5', '3-5', '6-8', '9-12'];

const VALID_PATHWAYS = [
  'software-development',
  'data-science',
  'cybersecurity',
  'ai-ml',
  'web-development',
  'game-development',
  'robotics',
  'computational-thinking'
];

export function validateDistrictProfile(
  input: unknown
): ValidationResult<DistrictProfileInput> {
  const errors: ValidationError[] = [];

  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'body', message: 'Request body is required' }],
    };
  }

  const data = input as Record<string, unknown>;

  // Validate school name
  const schoolName = sanitizeString(data.schoolName as string);
  if (!schoolName || schoolName.length < 2) {
    errors.push({ field: 'schoolName', message: 'School name is required (min 2 characters)' });
  } else if (schoolName.length > 200) {
    errors.push({ field: 'schoolName', message: 'School name is too long (max 200 characters)' });
  }

  // Validate city
  const city = sanitizeString(data.city as string);
  if (!city || city.length < 2) {
    errors.push({ field: 'city', message: 'City is required (min 2 characters)' });
  } else if (city.length > 100) {
    errors.push({ field: 'city', message: 'City name is too long (max 100 characters)' });
  }

  // Validate state
  const state = sanitizeString(data.state as string);
  if (!state) {
    errors.push({ field: 'state', message: 'State is required' });
  } else if (!VALID_STATES.includes(state)) {
    errors.push({ field: 'state', message: 'Invalid state selected' });
  }

  // Validate grade levels
  let gradeLevels: string[] = [];
  if (Array.isArray(data.gradeLevels)) {
    gradeLevels = data.gradeLevels.filter(
      (level): level is string =>
        typeof level === 'string' && VALID_GRADE_LEVELS.includes(level)
    );
  }

  // Validate pathways
  let pathways: string[] = [];
  if (Array.isArray(data.pathways)) {
    pathways = data.pathways.filter(
      (pathway): pathway is string =>
        typeof pathway === 'string' && VALID_PATHWAYS.includes(pathway)
    );
  }

  // Sanitize optional text fields
  const currentOfferings = sanitizeString(data.currentOfferings as string);
  const resources = sanitizeString(data.resources as string);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      schoolName,
      city,
      state,
      gradeLevels,
      currentOfferings: currentOfferings || undefined,
      pathways: pathways.length > 0 ? pathways : undefined,
      resources: resources || undefined,
    },
  };
}

/**
 * Validate chat message input
 */
export interface ChatMessageInput {
  message: string;
  conversationId?: string;
  districtProfile?: DistrictProfileInput;
  locale?: string;
}

const VALID_LOCALES = ['en', 'es', 'de', 'zh', 'pt'];

export function validateChatMessage(
  input: unknown
): ValidationResult<ChatMessageInput> {
  const errors: ValidationError[] = [];

  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'body', message: 'Request body is required' }],
    };
  }

  const data = input as Record<string, unknown>;

  // Validate message
  const message = sanitizeString(data.message as string);
  if (!message || message.length < 1) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (message.length > 5000) {
    errors.push({ field: 'message', message: 'Message is too long (max 5000 characters)' });
  }

  // Validate optional conversationId (should be a UUID-like string)
  let conversationId: string | undefined;
  if (data.conversationId) {
    if (typeof data.conversationId !== 'string') {
      errors.push({ field: 'conversationId', message: 'Invalid conversation ID' });
    } else {
      conversationId = data.conversationId;
    }
  }

  // Validate locale
  let locale = 'en';
  if (data.locale) {
    if (typeof data.locale === 'string' && VALID_LOCALES.includes(data.locale)) {
      locale = data.locale;
    }
  }

  // Validate district profile if provided
  let districtProfile: DistrictProfileInput | undefined;
  if (data.districtProfile) {
    const profileResult = validateDistrictProfile(data.districtProfile);
    if (!profileResult.valid) {
      errors.push(
        ...(profileResult.errors?.map(e => ({
          field: `districtProfile.${e.field}`,
          message: e.message,
        })) || [])
      );
    } else {
      districtProfile = profileResult.data;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      message,
      conversationId,
      districtProfile,
      locale,
    },
  };
}

/**
 * Validate plan generation input
 */
export interface PlanGenerationInput {
  districtProfile: DistrictProfileInput;
  locale: string;
}

export function validatePlanGeneration(
  input: unknown
): ValidationResult<PlanGenerationInput> {
  const errors: ValidationError[] = [];

  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'body', message: 'Request body is required' }],
    };
  }

  const data = input as Record<string, unknown>;

  // District profile is required for plan generation
  if (!data.districtProfile) {
    errors.push({ field: 'districtProfile', message: 'District profile is required' });
  } else {
    const profileResult = validateDistrictProfile(data.districtProfile);
    if (!profileResult.valid) {
      errors.push(...(profileResult.errors || []));
    }
  }

  // Validate locale
  let locale = 'en';
  if (data.locale) {
    if (typeof data.locale === 'string' && VALID_LOCALES.includes(data.locale)) {
      locale = data.locale;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const profileResult = validateDistrictProfile(data.districtProfile);

  return {
    valid: true,
    data: {
      districtProfile: profileResult.data!,
      locale,
    },
  };
}

/**
 * Create validation error response
 */
export function createValidationErrorResponse(errors: ValidationError[]): Response {
  return Response.json(
    {
      error: 'Validation failed',
      errors,
    },
    { status: 400 }
  );
}
