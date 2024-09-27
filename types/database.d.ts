export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      dish: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dish_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "dish_type"
            referencedColumns: ["id"]
          },
        ]
      }
      dish_type: {
        Row: {
          id: number
          type: string | null
        }
        Insert: {
          id?: number
          type?: string | null
        }
        Update: {
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      food_provider: {
        Row: {
          address: string | null
          close_hour_1: string | null
          close_hour_2: string | null
          id: number
          name: string | null
          open_hour_1: string | null
          open_hour_2: string | null
        }
        Insert: {
          address?: string | null
          close_hour_1?: string | null
          close_hour_2?: string | null
          id?: number
          name?: string | null
          open_hour_1?: string | null
          open_hour_2?: string | null
        }
        Update: {
          address?: string | null
          close_hour_1?: string | null
          close_hour_2?: string | null
          id?: number
          name?: string | null
          open_hour_1?: string | null
          open_hour_2?: string | null
        }
        Relationships: []
      }
      food_provider_dish: {
        Row: {
          dish_id: number
          food_provider_id: number
          price: number | null
        }
        Insert: {
          dish_id: number
          food_provider_id: number
          price?: number | null
        }
        Update: {
          dish_id?: number
          food_provider_id?: number
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "food_provider_dish_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dish"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_provider_dish_food_provider_id_fkey"
            columns: ["food_provider_id"]
            isOneToOne: false
            referencedRelation: "food_provider"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          day: string | null
          end_hour: string | null
          id: number
          organizer: string | null
        }
        Insert: {
          day?: string | null
          end_hour?: string | null
          id?: number
          organizer?: string | null
        }
        Update: {
          day?: string | null
          end_hour?: string | null
          id?: number
          organizer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_organizer_fkey"
            columns: ["organizer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_dish: {
        Row: {
          dish_id: number
          order_id: number
          quantity: number | null
        }
        Insert: {
          dish_id: number
          order_id: number
          quantity?: number | null
        }
        Update: {
          dish_id?: number
          order_id?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_dish_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dish"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dish_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          preferred_ship_address: string | null
          preferred_ship_hour: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          preferred_ship_address?: string | null
          preferred_ship_hour?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          preferred_ship_address?: string | null
          preferred_ship_hour?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_order: {
        Row: {
          order_id: number
          profiles_id: string
        }
        Insert: {
          order_id: number
          profiles_id: string
        }
        Update: {
          order_id?: number
          profiles_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_order_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_order_profiles_id_fkey"
            columns: ["profiles_id"]
            isOneToOne: false
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

