/**
 * RAG (Retrieval-Augmented Generation) Utilities
 *
 * Handles embedding generation and semantic search for the K-12 CS Education AI Planner.
 * Uses OpenAI text-embedding-3-small for embeddings and Firebase Firestore for storage.
 * Vector similarity is computed in-memory using cosine similarity.
 */

import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

// Types
export type DocType = 'csta' | 'state_policy' | 'curriculum' | 'scope_sequence';

export interface RAGDocument {
  id: string;
  docType: DocType;
  content: string;
  metadata: Record<string, unknown>;
  embedding?: number[];
}

export interface RAGSearchResult {
  id: string;
  docType: DocType;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

export interface RAGSearchOptions {
  docTypes?: DocType[];
  limit?: number;
  minSimilarity?: number;
  metadata?: Record<string, unknown>;
}

// Constants
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;
const DEFAULT_SEARCH_LIMIT = 10;
const DEFAULT_MIN_SIMILARITY = 0.5;
const RAG_COLLECTION = 'rag_documents';

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * Generate embedding for text using OpenAI API
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  // Clean and truncate text if needed (8191 tokens max for this model)
  const cleanedText = text.replace(/\n+/g, ' ').trim().slice(0, 30000);

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: cleanedText,
      dimensions: EMBEDDING_DIMENSIONS,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`OpenAI embedding API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  // Clean texts
  const cleanedTexts = texts.map(text =>
    text.replace(/\n+/g, ' ').trim().slice(0, 30000)
  );

  // Process in batches of 100 (OpenAI limit)
  const batchSize = 100;
  const results: number[][] = [];

  for (let i = 0; i < cleanedTexts.length; i += batchSize) {
    const batch = cleanedTexts.slice(i, i + batchSize);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: batch,
        dimensions: EMBEDDING_DIMENSIONS,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`OpenAI embedding API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const batchEmbeddings = data.data
      .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
      .map((item: { embedding: number[] }) => item.embedding);

    results.push(...batchEmbeddings);
  }

  return results;
}

/**
 * Store a document with its embedding in Firestore
 */
export async function storeDocument(doc: RAGDocument): Promise<void> {
  const db = getAdminFirestore();

  // Generate embedding if not provided
  const embedding = doc.embedding || await generateEmbedding(doc.content);

  await db.collection(RAG_COLLECTION).doc(doc.id).set({
    docType: doc.docType,
    content: doc.content,
    embedding: embedding,
    metadata: doc.metadata,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * Store multiple documents with their embeddings
 */
export async function storeDocuments(docs: RAGDocument[]): Promise<void> {
  const db = getAdminFirestore();

  // Generate embeddings for docs that don't have them
  const docsNeedingEmbeddings = docs.filter(d => !d.embedding);
  const textsToEmbed = docsNeedingEmbeddings.map(d => d.content);

  let embeddings: number[][] = [];
  if (textsToEmbed.length > 0) {
    embeddings = await generateEmbeddings(textsToEmbed);
  }

  // Assign embeddings to docs
  let embeddingIndex = 0;
  const docsWithEmbeddings = docs.map(doc => {
    if (!doc.embedding) {
      return { ...doc, embedding: embeddings[embeddingIndex++] };
    }
    return doc;
  });

  // Store in batches (Firestore batch limit is 500)
  const batchSize = 400;
  for (let i = 0; i < docsWithEmbeddings.length; i += batchSize) {
    const batch = db.batch();
    const batchDocs = docsWithEmbeddings.slice(i, i + batchSize);

    for (const doc of batchDocs) {
      const docRef = db.collection(RAG_COLLECTION).doc(doc.id);
      batch.set(docRef, {
        docType: doc.docType,
        content: doc.content,
        embedding: doc.embedding,
        metadata: doc.metadata,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
  }
}

/**
 * Search for similar documents using vector similarity
 */
export async function searchDocuments(
  query: string,
  options: RAGSearchOptions = {}
): Promise<RAGSearchResult[]> {
  const {
    docTypes,
    limit = DEFAULT_SEARCH_LIMIT,
    minSimilarity = DEFAULT_MIN_SIMILARITY,
  } = options;

  const db = getAdminFirestore();

  // Generate embedding for query
  const queryEmbedding = await generateEmbedding(query);

  // Build query based on docTypes filter
  const docsQuery = db.collection(RAG_COLLECTION);

  // Get all documents (or filtered by docType)
  // Note: For large collections, you'd want to use pagination or a vector DB
  let snapshot;
  if (docTypes && docTypes.length > 0) {
    snapshot = await docsQuery.where('docType', 'in', docTypes).get();
  } else {
    snapshot = await docsQuery.get();
  }

  // Calculate similarity for each document
  const results: RAGSearchResult[] = [];

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (!data.embedding) return;

    const similarity = cosineSimilarity(queryEmbedding, data.embedding);

    if (similarity >= minSimilarity) {
      results.push({
        id: doc.id,
        docType: data.docType,
        content: data.content,
        metadata: data.metadata || {},
        similarity,
      });
    }
  });

  // Sort by similarity (descending) and limit
  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, limit);
}

/**
 * Search with context expansion - gets related documents
 */
export async function searchWithContext(
  query: string,
  options: RAGSearchOptions = {}
): Promise<{
  primary: RAGSearchResult[];
  context: RAGSearchResult[];
}> {
  // Get primary results
  const primary = await searchDocuments(query, options);

  // Extract unique document types from primary results
  const primaryDocTypes = new Set(primary.map(r => r.docType));

  // Get context from other document types
  const otherDocTypes: DocType[] = ['csta', 'state_policy', 'curriculum', 'scope_sequence']
    .filter(dt => !primaryDocTypes.has(dt as DocType)) as DocType[];

  const context = await searchDocuments(query, {
    ...options,
    docTypes: otherDocTypes,
    limit: 5,
  });

  return { primary, context };
}

/**
 * Delete a document from Firestore
 */
export async function deleteDocument(id: string): Promise<void> {
  const db = getAdminFirestore();
  await db.collection(RAG_COLLECTION).doc(id).delete();
}

/**
 * Delete all documents of a specific type
 */
export async function deleteDocumentsByType(docType: DocType): Promise<void> {
  const db = getAdminFirestore();
  const snapshot = await db.collection(RAG_COLLECTION).where('docType', '==', docType).get();

  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

/**
 * Get document count by type
 */
export async function getDocumentCounts(): Promise<Record<DocType, number>> {
  const db = getAdminFirestore();
  const snapshot = await db.collection(RAG_COLLECTION).get();

  const counts: Record<string, number> = {
    csta: 0,
    state_policy: 0,
    curriculum: 0,
    scope_sequence: 0,
  };

  snapshot.docs.forEach(doc => {
    const docType = doc.data().docType;
    if (docType in counts) {
      counts[docType]++;
    }
  });

  return counts as Record<DocType, number>;
}

// === CONTEXT FORMATTING FOR AI PROMPTS ===

/**
 * Format RAG results into context for AI prompts
 */
export function formatRAGContext(results: RAGSearchResult[]): string {
  if (results.length === 0) {
    return '';
  }

  const sections: Record<DocType, string[]> = {
    csta: [],
    state_policy: [],
    curriculum: [],
    scope_sequence: [],
  };

  for (const result of results) {
    sections[result.docType].push(result.content);
  }

  const formatted: string[] = [];

  if (sections.csta.length > 0) {
    formatted.push('=== RELEVANT CSTA STANDARDS ===');
    formatted.push(sections.csta.join('\n\n'));
  }

  if (sections.state_policy.length > 0) {
    formatted.push('=== RELEVANT STATE POLICIES ===');
    formatted.push(sections.state_policy.join('\n\n'));
  }

  if (sections.curriculum.length > 0) {
    formatted.push('=== RELEVANT CURRICULA ===');
    formatted.push(sections.curriculum.join('\n\n'));
  }

  if (sections.scope_sequence.length > 0) {
    formatted.push('=== RELEVANT SCOPE & SEQUENCE EXAMPLES ===');
    formatted.push(sections.scope_sequence.join('\n\n'));
  }

  return formatted.join('\n\n');
}

/**
 * Get relevant context for a district profile
 */
export async function getContextForDistrict(
  districtProfile: {
    state: string;
    gradeLevels: string[];
    pathways?: string[];
    currentOfferings?: string;
  }
): Promise<string> {
  const queries: string[] = [];

  // Build queries based on district profile
  const gradeRanges = districtProfile.gradeLevels.join(', ');
  queries.push(`K-12 CS curriculum for grades ${gradeRanges}`);

  if (districtProfile.state) {
    queries.push(`${districtProfile.state} computer science education policy requirements`);
  }

  if (districtProfile.pathways && districtProfile.pathways.length > 0) {
    queries.push(`CS pathways: ${districtProfile.pathways.join(', ')}`);
  }

  // Perform searches
  const allResults: RAGSearchResult[] = [];

  for (const query of queries) {
    const results = await searchDocuments(query, {
      limit: 5,
      minSimilarity: 0.4,
    });
    allResults.push(...results);
  }

  // Deduplicate by ID
  const uniqueResults = Array.from(
    new Map(allResults.map(r => [r.id, r])).values()
  );

  // Sort by similarity
  uniqueResults.sort((a, b) => b.similarity - a.similarity);

  // Take top results
  const topResults = uniqueResults.slice(0, 15);

  return formatRAGContext(topResults);
}

/**
 * Get context for a specific question
 */
export async function getContextForQuestion(
  question: string,
  districtState?: string
): Promise<string> {
  // Search with the question
  const results = await searchDocuments(question, {
    limit: 10,
    minSimilarity: 0.4,
  });

  // If district state is provided, also get state-specific policy
  if (districtState) {
    const stateResults = await searchDocuments(
      `${districtState} computer science education policy`,
      {
        docTypes: ['state_policy'],
        limit: 2,
        minSimilarity: 0.3,
      }
    );

    // Add state results if not already present
    for (const sr of stateResults) {
      if (!results.find(r => r.id === sr.id)) {
        results.push(sr);
      }
    }
  }

  return formatRAGContext(results);
}
