/**
 * RAG Document Seeding Script
 *
 * This script populates the Supabase database with RAG documents
 * including CSTA standards, state policies, and curriculum guides.
 *
 * Usage:
 *   npx tsx scripts/seed-rag-documents.ts
 *
 * Environment variables required:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - OPENAI_API_KEY
 */

import { createClient } from '@supabase/supabase-js';

// Import data sources
import { cstaStandards, generateCSTARAGDocuments } from '../data/rag/csta-standards';
import { statePolicies, generateStatePolicyRAGDocuments } from '../data/rag/state-policies';
import { curriculaEnhanced, generateCurriculumRAGDocuments } from '../data/rag/curricula-enhanced';

// Types
interface RAGDocument {
  id: string;
  docType: string;
  content: string;
  metadata: Record<string, unknown>;
}

// Constants
const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 50;

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

if (!openaiApiKey) {
  console.error('Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Generate embeddings for a batch of texts
 */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const cleanedTexts = texts.map(text =>
    text.replace(/\n+/g, ' ').trim().slice(0, 30000)
  );

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: cleanedTexts,
      dimensions: EMBEDDING_DIMENSIONS,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.data
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((item: { embedding: number[] }) => item.embedding);
}

/**
 * Store documents with embeddings in batches
 */
async function storeDocuments(
  documents: RAGDocument[],
  docTypeName: string
): Promise<void> {

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    const progress = Math.min(i + BATCH_SIZE, documents.length);

    // Generate embeddings for batch
    const texts = batch.map(doc => doc.content);
    const embeddings = await generateEmbeddings(texts);

    // Prepare records for insertion
    const records = batch.map((doc, index) => ({
      id: doc.id,
      doc_type: doc.docType,
      content: doc.content,
      embedding: embeddings[index],
      metadata: doc.metadata,
      updated_at: new Date().toISOString(),
    }));

    // Upsert to database
    const { error } = await supabase
      .from('rag_documents')
      .upsert(records, { onConflict: 'id' });

    if (error) {
      console.error(`  Error storing batch: ${error.message}`);
      throw error;
    }

    // Rate limiting - wait between batches
    if (i + BATCH_SIZE < documents.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

}

/**
 * Clear existing documents of a type
 */
async function clearDocuments(docType: string): Promise<void> {
  const { error } = await supabase
    .from('rag_documents')
    .delete()
    .eq('doc_type', docType);

  if (error) {
    console.error(`Error clearing ${docType} documents: ${error.message}`);
    throw error;
  }
}

/**
 * Get document counts
 */
async function getDocumentCounts(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('rag_documents')
    .select('doc_type');

  if (error) {
    throw error;
  }

  const counts: Record<string, number> = {};
  for (const row of data || []) {
    counts[row.doc_type] = (counts[row.doc_type] || 0) + 1;
  }
  return counts;
}

/**
 * Main seeding function
 */
async function seedRAGDocuments(): Promise<void> {

  // Get current counts
  try {
    const counts = await getDocumentCounts();
  } catch {
    console.log('  (Could not retrieve counts - table may not exist yet)');
  }

  // Generate documents from data sources

  // CSTA Standards
  const cstaDocuments = generateCSTARAGDocuments();

  // State Policies
  const policyDocuments = generateStatePolicyRAGDocuments();

  // Curricula
  const curriculumDocuments = generateCurriculumRAGDocuments();

  // Store documents

  try {
    await storeDocuments(
      cstaDocuments.map(d => ({ ...d, docType: d.docType as string })),
      'CSTA Standards'
    );

    await storeDocuments(
      policyDocuments.map(d => ({ ...d, docType: d.docType as string })),
      'State Policies'
    );

    await storeDocuments(
      curriculumDocuments.map(d => ({ ...d, docType: d.docType as string })),
      'Curricula'
    );

    // Final counts
    const finalCounts = await getDocumentCounts();


  } catch (error) {
    console.error('\nSeeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding script
seedRAGDocuments();
