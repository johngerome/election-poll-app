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
      barangay: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          voters: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          voters?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          voters?: number | null;
        };
        Relationships: [];
      };
      candidates: {
        Row: {
          address: string | null;
          avatar: string | null;
          created_at: string;
          first_name: string | null;
          id: number;
          last_name: string | null;
          location_id: number | null;
          nickname: string | null;
          number: number | null;
          party_list_id: number | null;
          position: string | null;
        };
        Insert: {
          address?: string | null;
          avatar?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          location_id?: number | null;
          nickname?: string | null;
          number?: number | null;
          party_list_id?: number | null;
          position?: string | null;
        };
        Update: {
          address?: string | null;
          avatar?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          location_id?: number | null;
          nickname?: string | null;
          number?: number | null;
          party_list_id?: number | null;
          position?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'candidates_location_id_fkey';
            columns: ['location_id'];
            referencedRelation: 'barangay';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'candidates_party_list_id_fkey';
            columns: ['party_list_id'];
            referencedRelation: 'party_list';
            referencedColumns: ['id'];
          },
        ];
      };
      party_list: {
        Row: {
          abbreviation: string | null;
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          abbreviation?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          abbreviation?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      votes: {
        Row: {
          candidate_id: number;
          created_at: string;
          id: number;
          updated_at: string | null;
          user_id: string | null;
          votes: number | null;
        };
        Insert: {
          candidate_id: number;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
          user_id?: string | null;
          votes?: number | null;
        };
        Update: {
          candidate_id?: number;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
          user_id?: string | null;
          votes?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'votes_candidate_id_fkey';
            columns: ['candidate_id'];
            referencedRelation: 'candidates';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'votes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
