export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          id: string
          job_id: string
          status: string | null
          talent_id: string
          updated_at: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id: string
          status?: string | null
          talent_id: string
          updated_at?: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id?: string
          status?: string | null
          talent_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talents"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accessibility_practices: string | null
          benefits: string[] | null
          cnpj: string | null
          company_name: string
          company_size: string | null
          created_at: string
          description: string | null
          id: string
          industry: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          accessibility_practices?: string | null
          benefits?: string[] | null
          cnpj?: string | null
          company_name: string
          company_size?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          accessibility_practices?: string | null
          benefits?: string[] | null
          cnpj?: string | null
          company_name?: string
          company_size?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          benefits: string[] | null
          company_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          location: string | null
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          title: string
          updated_at: string
          work_model: string | null
        }
        Insert: {
          benefits?: string[] | null
          company_id: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          title: string
          updated_at?: string
          work_model?: string | null
        }
        Update: {
          benefits?: string[] | null
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          title?: string
          updated_at?: string
          work_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          state: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          city?: string | null
          created_at?: string
          full_name: string
          id: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          city?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      talents: {
        Row: {
          age: number | null
          availability: string | null
          bio: string | null
          course: string | null
          created_at: string
          disability_description: string | null
          disability_types:
            | Database["public"]["Enums"]["disability_type"][]
            | null
          education_level: Database["public"]["Enums"]["education_level"] | null
          id: string
          linkedin_url: string | null
          portfolio_url: string | null
          preferred_work_model: string | null
          professional_experience: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          availability?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          disability_description?: string | null
          disability_types?:
            | Database["public"]["Enums"]["disability_type"][]
            | null
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          id?: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          preferred_work_model?: string | null
          professional_experience?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          availability?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          disability_description?: string | null
          disability_types?:
            | Database["public"]["Enums"]["disability_type"][]
            | null
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          id?: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          preferred_work_model?: string | null
          professional_experience?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      disability_type:
        | "visual"
        | "auditiva"
        | "fisica"
        | "intelectual"
        | "psicossocial"
        | "multipla"
        | "neurodivergencia"
        | "outro"
      education_level:
        | "fundamental_incompleto"
        | "fundamental_completo"
        | "medio_incompleto"
        | "medio_completo"
        | "superior_incompleto"
        | "superior_completo"
        | "pos_graduacao"
        | "mestrado"
        | "doutorado"
      user_type: "talent" | "company" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      disability_type: [
        "visual",
        "auditiva",
        "fisica",
        "intelectual",
        "psicossocial",
        "multipla",
        "neurodivergencia",
        "outro",
      ],
      education_level: [
        "fundamental_incompleto",
        "fundamental_completo",
        "medio_incompleto",
        "medio_completo",
        "superior_incompleto",
        "superior_completo",
        "pos_graduacao",
        "mestrado",
        "doutorado",
      ],
      user_type: ["talent", "company", "admin"],
    },
  },
} as const
