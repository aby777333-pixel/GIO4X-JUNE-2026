// AUTO-GENERATED — DO NOT EDIT BY HAND
// Source: Supabase MCP `generate_typescript_types` against project tdifcayznqnaduchzfqz
// Regenerate after every migration by running the MCP tool and pasting the output here.
// (Or, with the Supabase CLI: `npx supabase gen types typescript --project-id tdifcayznqnaduchzfqz`.)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // The Supabase MCP also emits an __InternalSupabase: { PostgrestVersion }
  // marker. We omit it here because @supabase/ssr 0.5.x infers
  // `SchemaName extends keyof Database` and that extra key throws off the
  // narrowing, breaking .rpc() and .from() typing.
  public: {
    Tables: {
      announcements: {
        Row: {
          active: boolean
          audience: string
          body: string
          created_at: string
          created_by: string | null
          ends_at: string | null
          id: string
          kind: Database["public"]["Enums"]["notification_kind"]
          starts_at: string
          title: string
        }
        Insert: {
          active?: boolean
          audience?: string
          body: string
          created_at?: string
          created_by?: string | null
          ends_at?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["notification_kind"]
          starts_at?: string
          title: string
        }
        Update: {
          active?: boolean
          audience?: string
          body?: string
          created_at?: string
          created_by?: string | null
          ends_at?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["notification_kind"]
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          actor_id: string | null
          context: Json
          created_at: string
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          actor_id?: string | null
          context?: Json
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          actor_id?: string | null
          context?: Json
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_ledger: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          ib_user_id: string
          id: string
          lots: number
          period_end: string | null
          period_start: string | null
          settled: boolean
          settlement_tx_id: string | null
          source_user_id: string
          trading_account_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          ib_user_id: string
          id?: string
          lots?: number
          period_end?: string | null
          period_start?: string | null
          settled?: boolean
          settlement_tx_id?: string | null
          source_user_id: string
          trading_account_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          ib_user_id?: string
          id?: string
          lots?: number
          period_end?: string | null
          period_start?: string | null
          settled?: boolean
          settlement_tx_id?: string | null
          source_user_id?: string
          trading_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_ledger_ib_user_id_fkey"
            columns: ["ib_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_ledger_settlement_tx_id_fkey"
            columns: ["settlement_tx_id"]
            isOneToOne: false
            referencedRelation: "wallet_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_ledger_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_ledger_trading_account_id_fkey"
            columns: ["trading_account_id"]
            isOneToOne: false
            referencedRelation: "trading_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_plans: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          is_default: boolean
          name: string
          rate_per_lot: number
          sub_ib_share_l1: number
          sub_ib_share_l2: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
          rate_per_lot?: number
          sub_ib_share_l1?: number
          sub_ib_share_l2?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          name?: string
          rate_per_lot?: number
          sub_ib_share_l1?: number
          sub_ib_share_l2?: number
        }
        Relationships: []
      }
      crm_profiles: {
        Row: {
          assigned_staff: string | null
          created_at: string
          lifecycle_stage: string
          lifetime_value: number
          notes: string
          risk_level: number
          source: string
          summary: string
          tags: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_staff?: string | null
          created_at?: string
          lifecycle_stage?: string
          lifetime_value?: number
          notes?: string
          risk_level?: number
          source?: string
          summary?: string
          tags?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_staff?: string | null
          created_at?: string
          lifecycle_stage?: string
          lifetime_value?: number
          notes?: string
          risk_level?: number
          source?: string
          summary?: string
          tags?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_profiles_assigned_staff_fkey"
            columns: ["assigned_staff"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      device_sessions: {
        Row: {
          created_at: string
          device_id: string
          device_label: string | null
          id: string
          ip_address: unknown
          last_seen_at: string
          revoked_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          device_label?: string | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string
          revoked_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          device_label?: string | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string
          revoked_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ib_relationships: {
        Row: {
          child_id: string
          commission_plan_id: string | null
          created_at: string
          id: string
          level: number
          parent_id: string
          share_override: number | null
        }
        Insert: {
          child_id: string
          commission_plan_id?: string | null
          created_at?: string
          id?: string
          level: number
          parent_id: string
          share_override?: number | null
        }
        Update: {
          child_id?: string
          commission_plan_id?: string | null
          created_at?: string
          id?: string
          level?: number
          parent_id?: string
          share_override?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ib_relationships_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ib_relationships_commission_plan_id_fkey"
            columns: ["commission_plan_id"]
            isOneToOne: false
            referencedRelation: "commission_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ib_relationships_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          created_at: string
          doc_type: Database["public"]["Enums"]["kyc_doc_type"]
          file_name: string | null
          file_size_bytes: number | null
          id: string
          mime_type: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["kyc_doc_status"]
          storage_path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_type: Database["public"]["Enums"]["kyc_doc_type"]
          file_name?: string | null
          file_size_bytes?: number | null
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["kyc_doc_status"]
          storage_path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          doc_type?: Database["public"]["Enums"]["kyc_doc_type"]
          file_name?: string | null
          file_size_bytes?: number | null
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["kyc_doc_status"]
          storage_path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kyc_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      login_history: {
        Row: {
          country: string | null
          created_at: string
          device_id: string | null
          email_attempted: string | null
          failure_reason: string | null
          id: string
          ip_address: unknown
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          device_id?: string | null
          email_attempted?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown
          success: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          device_id?: string | null
          email_attempted?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "login_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["notification_kind"]
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["notification_kind"]
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["notification_kind"]
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          language: string
          metadata: Json
          phone: string | null
          referral_code: string | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          timezone: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          language?: string
          metadata?: Json
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          timezone?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          language?: string
          metadata?: Json
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          clicks: number
          code: string
          conversions: number
          created_at: string
          destination: string
          id: string
          name: string | null
          owner_id: string
          sub_id: string | null
        }
        Insert: {
          clicks?: number
          code: string
          conversions?: number
          created_at?: string
          destination?: string
          id?: string
          name?: string | null
          owner_id: string
          sub_id?: string | null
        }
        Update: {
          clicks?: number
          code?: string
          conversions?: number
          created_at?: string
          destination?: string
          id?: string
          name?: string | null
          owner_id?: string
          sub_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_staff: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_ref: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_staff?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_ref: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_staff?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          ticket_ref?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_staff_fkey"
            columns: ["assigned_staff"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          attachments: Json
          author_id: string
          body: string
          created_at: string
          id: string
          is_staff_reply: boolean
          ticket_id: string
        }
        Insert: {
          attachments?: Json
          author_id: string
          body: string
          created_at?: string
          id?: string
          is_staff_reply?: boolean
          ticket_id: string
        }
        Update: {
          attachments?: Json
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          is_staff_reply?: boolean
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_accounts: {
        Row: {
          account_kind: Database["public"]["Enums"]["account_kind"]
          account_number: string
          balance: number
          base_currency: Database["public"]["Enums"]["wallet_currency"]
          created_at: string
          equity: number
          id: string
          leverage: number
          margin_free: number
          plan_name: string
          server: string
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_kind?: Database["public"]["Enums"]["account_kind"]
          account_number: string
          balance?: number
          base_currency?: Database["public"]["Enums"]["wallet_currency"]
          created_at?: string
          equity?: number
          id?: string
          leverage?: number
          margin_free?: number
          plan_name?: string
          server?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_kind?: Database["public"]["Enums"]["account_kind"]
          account_number?: string
          balance?: number
          base_currency?: Database["public"]["Enums"]["wallet_currency"]
          created_at?: string
          equity?: number
          id?: string
          leverage?: number
          margin_free?: number
          plan_name?: string
          server?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trading_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          gateway: string | null
          gateway_ref: string | null
          id: string
          idempotency_key: string
          metadata: Json
          related_user_id: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          wallet_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          gateway?: string | null
          gateway_ref?: string | null
          id?: string
          idempotency_key: string
          metadata?: Json
          related_user_id?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          wallet_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          gateway?: string | null
          gateway_ref?: string | null
          id?: string
          idempotency_key?: string
          metadata?: Json
          related_user_id?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          id: string
          status: Database["public"]["Enums"]["wallet_status"]
          type: Database["public"]["Enums"]["wallet_type"]
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          id?: string
          status?: Database["public"]["Enums"]["wallet_status"]
          type?: Database["public"]["Enums"]["wallet_type"]
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          id?: string
          status?: Database["public"]["Enums"]["wallet_status"]
          type?: Database["public"]["Enums"]["wallet_type"]
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
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
      check_login_lockout: {
        Args: {
          p_email: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      generate_referral_code: { Args: { p_user_id: string }; Returns: string }
      is_admin: { Args: Record<string, never>; Returns: boolean }
      is_staff: { Args: Record<string, never>; Returns: boolean }
      process_wallet_transaction: {
        Args: {
          p_amount: number
          p_gateway?: string
          p_gateway_ref?: string
          p_idempotency_key: string
          p_metadata?: Json
          p_related_user_id?: string
          p_status?: Database["public"]["Enums"]["transaction_status"]
          p_type: Database["public"]["Enums"]["transaction_type"]
          p_wallet_id: string
        }
        Returns: string
      }
      record_login_attempt: {
        Args: {
          p_country?: string
          p_device_id?: string
          p_email: string
          p_failure_reason?: string
          p_ip?: string
          p_success: boolean
          p_user_agent?: string
          p_user_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      account_kind: "demo" | "live" | "copy" | "prop" | "managed"
      account_status: "active" | "archived" | "suspended"
      audit_action: "INSERT" | "UPDATE" | "DELETE"
      kyc_doc_status: "pending" | "in_review" | "approved" | "rejected"
      kyc_doc_type:
        | "passport"
        | "national_id"
        | "drivers_license"
        | "utility_bill"
        | "bank_statement"
        | "selfie"
        | "other"
      kyc_status:
        | "not_started"
        | "in_progress"
        | "in_review"
        | "approved"
        | "rejected"
      notification_kind:
        | "account"
        | "kyc"
        | "funds"
        | "trade"
        | "ib"
        | "promo"
        | "system"
        | "security"
      ticket_category:
        | "account"
        | "kyc"
        | "deposit"
        | "withdraw"
        | "trading"
        | "ib"
        | "technical"
        | "other"
      ticket_priority: "low" | "normal" | "high" | "urgent"
      ticket_status:
        | "open"
        | "in_progress"
        | "waiting_customer"
        | "resolved"
        | "closed"
      transaction_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "reversed"
        | "cancelled"
      transaction_type:
        | "deposit"
        | "withdraw"
        | "transfer_in"
        | "transfer_out"
        | "bonus"
        | "rebate"
        | "commission"
        | "fee"
        | "adjustment"
      user_role: "trader" | "ib" | "affiliate" | "staff" | "admin"
      user_status: "pending_verification" | "active" | "suspended" | "closed"
      wallet_currency:
        | "USD"
        | "EUR"
        | "GBP"
        | "INR"
        | "AED"
        | "USDT"
        | "BTC"
        | "ETH"
        | "USC"
      wallet_status: "active" | "frozen" | "closed"
      wallet_type: "main" | "bonus" | "ib_commission"
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
      account_kind: ["demo", "live", "copy", "prop", "managed"],
      account_status: ["active", "archived", "suspended"],
      audit_action: ["INSERT", "UPDATE", "DELETE"],
      kyc_doc_status: ["pending", "in_review", "approved", "rejected"],
      kyc_doc_type: [
        "passport",
        "national_id",
        "drivers_license",
        "utility_bill",
        "bank_statement",
        "selfie",
        "other",
      ],
      kyc_status: [
        "not_started",
        "in_progress",
        "in_review",
        "approved",
        "rejected",
      ],
      notification_kind: [
        "account",
        "kyc",
        "funds",
        "trade",
        "ib",
        "promo",
        "system",
        "security",
      ],
      ticket_category: [
        "account",
        "kyc",
        "deposit",
        "withdraw",
        "trading",
        "ib",
        "technical",
        "other",
      ],
      ticket_priority: ["low", "normal", "high", "urgent"],
      ticket_status: [
        "open",
        "in_progress",
        "waiting_customer",
        "resolved",
        "closed",
      ],
      transaction_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "reversed",
        "cancelled",
      ],
      transaction_type: [
        "deposit",
        "withdraw",
        "transfer_in",
        "transfer_out",
        "bonus",
        "rebate",
        "commission",
        "fee",
        "adjustment",
      ],
      user_role: ["trader", "ib", "affiliate", "staff", "admin"],
      user_status: ["pending_verification", "active", "suspended", "closed"],
      wallet_currency: [
        "USD",
        "EUR",
        "GBP",
        "INR",
        "AED",
        "USDT",
        "BTC",
        "ETH",
        "USC",
      ],
      wallet_status: ["active", "frozen", "closed"],
      wallet_type: ["main", "bonus", "ib_commission"],
    },
  },
} as const
