export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      district_profiles: {
        Row: {
          id: string;
          user_id: string | null;
          school_name: string;
          city: string;
          state: string;
          grade_levels: string[];
          current_offerings: string | null;
          pathways: string[];
          resources: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          school_name: string;
          city: string;
          state: string;
          grade_levels: string[];
          current_offerings?: string | null;
          pathways?: string[];
          resources?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          school_name?: string;
          city?: string;
          state?: string;
          grade_levels?: string[];
          current_offerings?: string | null;
          pathways?: string[];
          resources?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      plans: {
        Row: {
          id: string;
          district_id: string;
          version: number;
          title: string | null;
          scope_sequence: Json;
          curriculum_recommendations: Json;
          standards_mapping: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          district_id: string;
          version?: number;
          title?: string | null;
          scope_sequence?: Json;
          curriculum_recommendations?: Json;
          standards_mapping?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          district_id?: string;
          version?: number;
          title?: string | null;
          scope_sequence?: Json;
          curriculum_recommendations?: Json;
          standards_mapping?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          district_id: string;
          plan_id: string | null;
          locale: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          district_id: string;
          plan_id?: string | null;
          locale?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          district_id?: string;
          plan_id?: string | null;
          locale?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: string;
          content: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: string;
          content: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: string;
          content?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      rag_documents: {
        Row: {
          id: string;
          doc_type: string;
          content: string;
          embedding: number[] | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          doc_type: string;
          content: string;
          embedding?: number[] | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          doc_type?: string;
          content?: string;
          embedding?: number[] | null;
          metadata?: Json;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      match_documents: {
        Args: {
          query_embedding: number[];
          match_threshold: number;
          match_count: number;
          filter_doc_type?: string;
        };
        Returns: {
          id: string;
          doc_type: string;
          content: string;
          metadata: Json;
          similarity: number;
        }[];
      };
    };
    Enums: Record<string, never>;
  };
}

// Helper types for convenience
export type DistrictProfile = Database['public']['Tables']['district_profiles']['Row'];
export type DistrictProfileInsert = Database['public']['Tables']['district_profiles']['Insert'];
export type DistrictProfileUpdate = Database['public']['Tables']['district_profiles']['Update'];

export type Plan = Database['public']['Tables']['plans']['Row'];
export type PlanInsert = Database['public']['Tables']['plans']['Insert'];
export type PlanUpdate = Database['public']['Tables']['plans']['Update'];

export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type ConversationInsert = Database['public']['Tables']['conversations']['Insert'];

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export type RagDocument = Database['public']['Tables']['rag_documents']['Row'];
export type RagDocumentInsert = Database['public']['Tables']['rag_documents']['Insert'];
