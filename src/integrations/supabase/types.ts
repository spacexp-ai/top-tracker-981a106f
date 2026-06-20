export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          camp_tier: string | null;
          created_at: string;
          current_step: number;
          end_date: string | null;
          id: string;
          kit: Json;
          notes: string | null;
          party_size: number;
          ph_id: string | null;
          species_id: string | null;
          start_date: string | null;
          status: Database["public"]["Enums"]["booking_status"];
          total_estimate_usd: number | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          camp_tier?: string | null;
          created_at?: string;
          current_step?: number;
          end_date?: string | null;
          id?: string;
          kit?: Json;
          notes?: string | null;
          party_size?: number;
          ph_id?: string | null;
          species_id?: string | null;
          start_date?: string | null;
          status?: Database["public"]["Enums"]["booking_status"];
          total_estimate_usd?: number | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          camp_tier?: string | null;
          created_at?: string;
          current_step?: number;
          end_date?: string | null;
          id?: string;
          kit?: Json;
          notes?: string | null;
          party_size?: number;
          ph_id?: string | null;
          species_id?: string | null;
          start_date?: string | null;
          status?: Database["public"]["Enums"]["booking_status"];
          total_estimate_usd?: number | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_ph_id_fkey";
            columns: ["ph_id"];
            isOneToOne: false;
            referencedRelation: "professional_hunters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_species_id_fkey";
            columns: ["species_id"];
            isOneToOne: false;
            referencedRelation: "species";
            referencedColumns: ["id"];
          },
        ];
      };
      professional_hunters: {
        Row: {
          active: boolean;
          bio: string | null;
          created_at: string;
          id: string;
          name: string;
          photo_url: string | null;
          specialties: string[];
          years_experience: number;
        };
        Insert: {
          active?: boolean;
          bio?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          photo_url?: string | null;
          specialties?: string[];
          years_experience?: number;
        };
        Update: {
          active?: boolean;
          bio?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          photo_url?: string | null;
          specialties?: string[];
          years_experience?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          country: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          tier: Database["public"]["Enums"]["app_role"];
          updated_at: string;
          bio: string | null;
          favorite_quarry: string | null;
          is_public: boolean | null;
          social_links: Json | null;
          experience_level: string | null;
          preferred_weapon: string | null;
          years_experience: number | null;
          boot_size: string | null;
          apparel_size: string | null;
          dominant_hand: string | null;
          firearm_permit_num: string | null;
          passport_country: string | null;
          passport_num: string | null;
          preferred_camp: string | null;
          primary_interests: string[] | null;
          emergency_name: string | null;
          emergency_phone: string | null;
          dietary: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          country?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          tier?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          bio?: string | null;
          favorite_quarry?: string | null;
          is_public?: boolean | null;
          social_links?: Json | null;
          experience_level?: string | null;
          preferred_weapon?: string | null;
          years_experience?: number | null;
          boot_size?: string | null;
          apparel_size?: string | null;
          dominant_hand?: string | null;
          firearm_permit_num?: string | null;
          passport_country?: string | null;
          passport_num?: string | null;
          preferred_camp?: string | null;
          primary_interests?: string[] | null;
          emergency_name?: string | null;
          emergency_phone?: string | null;
          dietary?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          country?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          tier?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          bio?: string | null;
          favorite_quarry?: string | null;
          is_public?: boolean | null;
          social_links?: Json | null;
          experience_level?: string | null;
          preferred_weapon?: string | null;
          years_experience?: number | null;
          boot_size?: string | null;
          apparel_size?: string | null;
          dominant_hand?: string | null;
          firearm_permit_num?: string | null;
          passport_country?: string | null;
          passport_num?: string | null;
          preferred_camp?: string | null;
          primary_interests?: string[] | null;
          emergency_name?: string | null;
          emergency_phone?: string | null;
          dietary?: string | null;
        };
        Relationships: [];
      };
      species: {
        Row: {
          base_price_usd: number;
          concession: string;
          created_at: string;
          description: string | null;
          emoji: string | null;
          id: string;
          name: string;
          season_months: number[];
          slug: string;
        };
        Insert: {
          base_price_usd: number;
          concession?: string;
          created_at?: string;
          description?: string | null;
          emoji?: string | null;
          id?: string;
          name: string;
          season_months?: number[];
          slug: string;
        };
        Update: {
          base_price_usd?: number;
          concession?: string;
          created_at?: string;
          description?: string | null;
          emoji?: string | null;
          id?: string;
          name?: string;
          season_months?: number[];
          slug?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "observer" | "tracker" | "member" | "admin";
      booking_status: "draft" | "submitted" | "confirmed" | "completed" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["observer", "tracker", "member", "admin"],
      booking_status: ["draft", "submitted", "confirmed", "completed", "cancelled"],
    },
  },
} as const;
