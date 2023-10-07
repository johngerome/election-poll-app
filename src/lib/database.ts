export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          address: string | null
          avatar: string | null
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          nickname: string | null
          number: number | null
          partylist_id: number | null
          position: string | null
        }
        Insert: {
          address?: string | null
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          nickname?: string | null
          number?: number | null
          partylist_id?: number | null
          position?: string | null
        }
        Update: {
          address?: string | null
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          nickname?: string | null
          number?: number | null
          partylist_id?: number | null
          position?: string | null
        }
        Relationships: []
      }
      candidates_location: {
        Row: {
          candidate_id: number | null
          created_at: string
          id: number
          location_id: number | null
        }
        Insert: {
          candidate_id?: number | null
          created_at?: string
          id?: number
          location_id?: number | null
        }
        Update: {
          candidate_id?: number | null
          created_at?: string
          id?: number
          location_id?: number | null
        }
        Relationships: []
      }
      location: {
        Row: {
          address: string | null
          created_at: string
          id: number
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      party_list: {
        Row: {
          abbreviation: string | null
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          candidate_id: number | null
          created_at: string
          id: number
          updated_at: string | null
          user_id: number | null
          votes: number | null
        }
        Insert: {
          candidate_id?: number | null
          created_at?: string
          id?: number
          updated_at?: string | null
          user_id?: number | null
          votes?: number | null
        }
        Update: {
          candidate_id?: number | null
          created_at?: string
          id?: number
          updated_at?: string | null
          user_id?: number | null
          votes?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
