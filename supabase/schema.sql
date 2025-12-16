-- K-12 CS Education AI Planning Assistant - Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- District Profiles table
CREATE TABLE IF NOT EXISTS district_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  school_name TEXT NOT NULL,
  state TEXT NOT NULL,
  grade_levels TEXT[] NOT NULL DEFAULT '{}',
  current_offerings TEXT,
  pathways TEXT[] NOT NULL DEFAULT '{}',
  resources TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Plans table for storing generated curriculum plans
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id UUID NOT NULL REFERENCES district_profiles(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  title TEXT,
  scope_sequence JSONB NOT NULL DEFAULT '{}',
  curriculum_recommendations JSONB NOT NULL DEFAULT '[]',
  standards_mapping JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversations table for chat history
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id UUID NOT NULL REFERENCES district_profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages table for individual chat messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RAG Documents table for storing embeddings
CREATE TABLE IF NOT EXISTS rag_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_type TEXT NOT NULL CHECK (doc_type IN ('csta', 'state_policy', 'curriculum', 'scope_sequence')),
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_district_profiles_user_id ON district_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_district_id ON plans(district_id);
CREATE INDEX IF NOT EXISTS idx_conversations_district_id ON conversations(district_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_rag_documents_doc_type ON rag_documents(doc_type);

-- Vector similarity search index (IVFFlat for faster queries)
CREATE INDEX IF NOT EXISTS idx_rag_documents_embedding ON rag_documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Function for semantic search on RAG documents
-- Supports filtering by a single doc_type or array of doc_types
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10,
  filter_doc_types text[] DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  doc_type TEXT,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rd.id,
    rd.doc_type,
    rd.content,
    rd.metadata,
    1 - (rd.embedding <=> query_embedding) AS similarity
  FROM rag_documents rd
  WHERE
    (filter_doc_types IS NULL OR rd.doc_type = ANY(filter_doc_types))
    AND rd.embedding IS NOT NULL
    AND 1 - (rd.embedding <=> query_embedding) > match_threshold
  ORDER BY rd.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_district_profiles_updated_at ON district_profiles;
CREATE TRIGGER update_district_profiles_updated_at
  BEFORE UPDATE ON district_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_plans_updated_at ON plans;
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE district_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_documents ENABLE ROW LEVEL SECURITY;

-- District profiles: Users can only access their own profiles
CREATE POLICY "Users can view own district profiles"
  ON district_profiles FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own district profiles"
  ON district_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own district profiles"
  ON district_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own district profiles"
  ON district_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Plans: Users can access plans linked to their districts
CREATE POLICY "Users can view plans for their districts"
  ON plans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = plans.district_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert plans for their districts"
  ON plans FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = plans.district_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

CREATE POLICY "Users can update plans for their districts"
  ON plans FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = plans.district_id
      AND dp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete plans for their districts"
  ON plans FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = plans.district_id
      AND dp.user_id = auth.uid()
    )
  );

-- Conversations: Users can access conversations for their districts
CREATE POLICY "Users can view conversations for their districts"
  ON conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = conversations.district_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert conversations for their districts"
  ON conversations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM district_profiles dp
      WHERE dp.id = conversations.district_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

-- Messages: Users can access messages in their conversations
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN district_profiles dp ON dp.id = c.district_id
      WHERE c.id = messages.conversation_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      JOIN district_profiles dp ON dp.id = c.district_id
      WHERE c.id = messages.conversation_id
      AND (dp.user_id = auth.uid() OR dp.user_id IS NULL)
    )
  );

-- RAG documents: Public read access (no sensitive data)
CREATE POLICY "Anyone can read RAG documents"
  ON rag_documents FOR SELECT
  TO authenticated, anon
  USING (true);

-- Only service role can insert/update RAG documents
CREATE POLICY "Service role can manage RAG documents"
  ON rag_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
