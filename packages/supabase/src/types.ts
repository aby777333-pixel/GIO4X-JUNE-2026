// AUTO-GENERATED -- DO NOT EDIT BY HAND
// Source: Supabase MCP `generate_typescript_types` against project tdifcayznqnaduchzfqz
// Regenerate after every migration by running the MCP tool and pasting the output here.

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
    PostgrestVersion: "14.5"
  }
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
      chat_conversations: {
        Row: {
          assigned_staff: string | null
          created_at: string
          guest_email: string | null
          guest_name: string | null
          id: string
          last_message_at: string
          source: string
          status: Database["public"]["Enums"]["chat_status"]
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_staff?: string | null
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          last_message_at?: string
          source?: string
          status?: Database["public"]["Enums"]["chat_status"]
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_staff?: string | null
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          last_message_at?: string
          source?: string
          status?: Database["public"]["Enums"]["chat_status"]
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_assigned_staff_fkey"
            columns: ["assigned_staff"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          author_id: string | null
          body: string
          conversation_id: string
          created_at: string
          id: string
          is_staff_reply: boolean
        }
        Insert: {
          author_id?: string | null
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          is_staff_reply?: boolean
        }
        Update: {
          author_id?: string | null
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_staff_reply?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
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
          metadata: Json
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
          metadata?: Json
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
          metadata?: Json
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
      crm_lead_activities: {
        Row: {
          actor_id: string | null
          body: string
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["crm_activity_kind"]
          lead_id: string
          metadata: Json
        }
        Insert: {
          actor_id?: string | null
          body?: string
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["crm_activity_kind"]
          lead_id: string
          metadata?: Json
        }
        Update: {
          actor_id?: string | null
          body?: string
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["crm_activity_kind"]
          lead_id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "crm_lead_activities_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          assigned_staff: string | null
          campaign: string | null
          converted_profile_id: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          last_activity_at: string
          lost_reason: string | null
          metadata: Json
          next_follow_up_at: string | null
          owner_notes: string
          phone: string | null
          referral_code: string | null
          score: number
          source: string
          stage: Database["public"]["Enums"]["crm_lead_stage"]
          status: Database["public"]["Enums"]["crm_lead_status"]
          updated_at: string
          utm: Json
        }
        Insert: {
          assigned_staff?: string | null
          campaign?: string | null
          converted_profile_id?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          last_activity_at?: string
          lost_reason?: string | null
          metadata?: Json
          next_follow_up_at?: string | null
          owner_notes?: string
          phone?: string | null
          referral_code?: string | null
          score?: number
          source?: string
          stage?: Database["public"]["Enums"]["crm_lead_stage"]
          status?: Database["public"]["Enums"]["crm_lead_status"]
          updated_at?: string
          utm?: Json
        }
        Update: {
          assigned_staff?: string | null
          campaign?: string | null
          converted_profile_id?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          last_activity_at?: string
          lost_reason?: string | null
          metadata?: Json
          next_follow_up_at?: string | null
          owner_notes?: string
          phone?: string | null
          referral_code?: string | null
          score?: number
          source?: string
          stage?: Database["public"]["Enums"]["crm_lead_stage"]
          status?: Database["public"]["Enums"]["crm_lead_status"]
          updated_at?: string
          utm?: Json
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_assigned_staff_fkey"
            columns: ["assigned_staff"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_leads_converted_profile_id_fkey"
            columns: ["converted_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      crm_tasks: {
        Row: {
          assigned_to: string | null
          client_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          due_at: string | null
          id: string
          lead_id: string | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          status: Database["public"]["Enums"]["crm_task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          lead_id?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["crm_task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          lead_id?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["crm_task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      deposit_bank_accounts: {
        Row: {
          account_number: string
          bank: string
          beneficiary: string
          created_at: string
          iban: string | null
          id: string
          ifsc: string | null
          is_active: boolean
          label: string
          notes: string | null
          reference_template: string
          region: string
          sort_order: number
          swift_code: string | null
          updated_at: string
        }
        Insert: {
          account_number: string
          bank: string
          beneficiary: string
          created_at?: string
          iban?: string | null
          id?: string
          ifsc?: string | null
          is_active?: boolean
          label: string
          notes?: string | null
          reference_template?: string
          region: string
          sort_order?: number
          swift_code?: string | null
          updated_at?: string
        }
        Update: {
          account_number?: string
          bank?: string
          beneficiary?: string
          created_at?: string
          iban?: string | null
          id?: string
          ifsc?: string | null
          is_active?: boolean
          label?: string
          notes?: string | null
          reference_template?: string
          region?: string
          sort_order?: number
          swift_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      deposit_crypto_addresses: {
        Row: {
          address: string
          created_at: string
          id: string
          is_active: boolean
          min_amount_usd: number
          min_confirmations: number
          network: string
          sort_order: number
          symbol: string
          updated_at: string
          warning: string | null
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          is_active?: boolean
          min_amount_usd?: number
          min_confirmations?: number
          network: string
          sort_order?: number
          symbol: string
          updated_at?: string
          warning?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          is_active?: boolean
          min_amount_usd?: number
          min_confirmations?: number
          network?: string
          sort_order?: number
          symbol?: string
          updated_at?: string
          warning?: string | null
        }
        Relationships: []
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
      events_outbox: {
        Row: {
          actor_id: string | null
          attempts: number
          created_at: string
          id: string
          payload: Json
          processed_at: string | null
          topic: string
        }
        Insert: {
          actor_id?: string | null
          attempts?: number
          created_at?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          topic: string
        }
        Update: {
          actor_id?: string | null
          attempts?: number
          created_at?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_outbox_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          description: string
          enabled: boolean
          key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string
          enabled?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string
          enabled?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_flags_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_charges: {
        Row: {
          base_amount: number
          calc_method: Database["public"]["Enums"]["fee_calc_method"] | null
          computed_amount: number
          created_at: string
          created_by: string | null
          currency: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id: string
          idempotency_key: string
          journal_entry_id: string | null
          lots: number | null
          metadata: Json
          notes: string | null
          rule_id: string | null
          schedule_id: string | null
          source_id: string | null
          source_type: string | null
          status: Database["public"]["Enums"]["fee_charge_status"]
          trading_account_id: string | null
          updated_at: string
          user_id: string | null
          wallet_id: string | null
          wallet_tx_id: string | null
        }
        Insert: {
          base_amount?: number
          calc_method?: Database["public"]["Enums"]["fee_calc_method"] | null
          computed_amount: number
          created_at?: string
          created_by?: string | null
          currency?: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id?: string
          idempotency_key: string
          journal_entry_id?: string | null
          lots?: number | null
          metadata?: Json
          notes?: string | null
          rule_id?: string | null
          schedule_id?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["fee_charge_status"]
          trading_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          wallet_id?: string | null
          wallet_tx_id?: string | null
        }
        Update: {
          base_amount?: number
          calc_method?: Database["public"]["Enums"]["fee_calc_method"] | null
          computed_amount?: number
          created_at?: string
          created_by?: string | null
          currency?: Database["public"]["Enums"]["wallet_currency"]
          fee_type?: Database["public"]["Enums"]["fee_type"]
          id?: string
          idempotency_key?: string
          journal_entry_id?: string | null
          lots?: number | null
          metadata?: Json
          notes?: string | null
          rule_id?: string | null
          schedule_id?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["fee_charge_status"]
          trading_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          wallet_id?: string | null
          wallet_tx_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_charges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "fee_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "fee_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_trading_account_id_fkey"
            columns: ["trading_account_id"]
            isOneToOne: false
            referencedRelation: "trading_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_charges_wallet_tx_id_fkey"
            columns: ["wallet_tx_id"]
            isOneToOne: false
            referencedRelation: "wallet_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_rules: {
        Row: {
          active: boolean
          calc_method: Database["public"]["Enums"]["fee_calc_method"]
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id: string
          is_rebate: boolean
          max_amount: number | null
          metadata: Json
          min_amount: number | null
          priority: number
          rate: number
          schedule_id: string
          tiers: Json
          updated_at: string
        }
        Insert: {
          active?: boolean
          calc_method: Database["public"]["Enums"]["fee_calc_method"]
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id?: string
          is_rebate?: boolean
          max_amount?: number | null
          metadata?: Json
          min_amount?: number | null
          priority?: number
          rate?: number
          schedule_id: string
          tiers?: Json
          updated_at?: string
        }
        Update: {
          active?: boolean
          calc_method?: Database["public"]["Enums"]["fee_calc_method"]
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          fee_type?: Database["public"]["Enums"]["fee_type"]
          id?: string
          is_rebate?: boolean
          max_amount?: number | null
          metadata?: Json
          min_amount?: number | null
          priority?: number
          rate?: number
          schedule_id?: string
          tiers?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fee_rules_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "fee_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_schedules: {
        Row: {
          active: boolean
          code: string
          created_at: string
          created_by: string | null
          description: string
          effective_from: string
          effective_to: string | null
          id: string
          name: string
          precedence: number
          scope: Json
          updated_at: string
          version: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          created_by?: string | null
          description?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          name: string
          precedence?: number
          scope?: Json
          updated_at?: string
          version?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          name?: string
          precedence?: number
          scope?: Json
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "fee_schedules_created_by_fkey"
            columns: ["created_by"]
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
      journal_entries: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          idempotency_key: string
          metadata: Json
          posted_at: string
          reference: string | null
          reverses_id: string | null
          source_id: string | null
          source_type: string
          status: Database["public"]["Enums"]["journal_status"]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          idempotency_key: string
          metadata?: Json
          posted_at?: string
          reference?: string | null
          reverses_id?: string | null
          source_id?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["journal_status"]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          idempotency_key?: string
          metadata?: Json
          posted_at?: string
          reference?: string | null
          reverses_id?: string | null
          source_id?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["journal_status"]
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_reverses_id_fkey"
            columns: ["reverses_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_lines: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          direction: string
          entry_id: string
          id: string
          memo: string | null
        }
        Insert: {
          account_id: string
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          direction: string
          entry_id: string
          id?: string
          memo?: string | null
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          direction?: string
          entry_id?: string
          id?: string
          memo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ledger_account_balances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ledger_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_lines_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
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
      ledger_accounts: {
        Row: {
          active: boolean
          code: string
          created_at: string
          currency: Database["public"]["Enums"]["wallet_currency"]
          id: string
          is_system: boolean
          metadata: Json
          name: string
          owner_id: string | null
          type: Database["public"]["Enums"]["ledger_account_type"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          id?: string
          is_system?: boolean
          metadata?: Json
          name: string
          owner_id?: string | null
          type: Database["public"]["Enums"]["ledger_account_type"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          currency?: Database["public"]["Enums"]["wallet_currency"]
          id?: string
          is_system?: boolean
          metadata?: Json
          name?: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["ledger_account_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_accounts_owner_id_fkey"
            columns: ["owner_id"]
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
      ledger_account_balances: {
        Row: {
          balance: number | null
          code: string | null
          currency: Database["public"]["Enums"]["wallet_currency"] | null
          id: string | null
          name: string | null
          owner_id: string | null
          total_credit: number | null
          total_debit: number | null
          type: Database["public"]["Enums"]["ledger_account_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_accounts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      charge_fee: {
        Args: {
          p_base_amount?: number
          p_created_by?: string
          p_fee_type: Database["public"]["Enums"]["fee_type"]
          p_idempotency_key: string
          p_lots?: number
          p_move_wallet?: boolean
          p_notes?: string
          p_override_amount?: number
          p_scope?: Json
          p_source_id?: string
          p_source_type?: string
          p_trading_account_id?: string
          p_user_id?: string
          p_wallet_id?: string
        }
        Returns: {
          base_amount: number
          calc_method: Database["public"]["Enums"]["fee_calc_method"] | null
          computed_amount: number
          created_at: string
          created_by: string | null
          currency: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id: string
          idempotency_key: string
          journal_entry_id: string | null
          lots: number | null
          metadata: Json
          notes: string | null
          rule_id: string | null
          schedule_id: string | null
          source_id: string | null
          source_type: string | null
          status: Database["public"]["Enums"]["fee_charge_status"]
          trading_account_id: string | null
          updated_at: string
          user_id: string | null
          wallet_id: string | null
          wallet_tx_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "fee_charges"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      check_login_lockout: {
        Args: {
          p_email: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      compute_fee: {
        Args: {
          p_at?: string
          p_base_amount?: number
          p_fee_type: Database["public"]["Enums"]["fee_type"]
          p_lots?: number
          p_scope?: Json
        }
        Returns: Json
      }
      distribute_rebate: {
        Args: {
          p_created_by?: string
          p_idempotency_prefix: string
          p_lots: number
          p_source_user_id: string
          p_trading_account_id: string
        }
        Returns: number
      }
      generate_referral_code: { Args: { p_user_id: string }; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      post_journal_entry: {
        Args: {
          p_created_by?: string
          p_description?: string
          p_idempotency_key: string
          p_lines: Json
          p_metadata?: Json
          p_reference?: string
          p_source_id?: string
          p_source_type?: string
        }
        Returns: string
      }
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
      staff_charge_fee: {
        Args: {
          p_base_amount?: number
          p_fee_type: Database["public"]["Enums"]["fee_type"]
          p_idempotency_key: string
          p_lots?: number
          p_move_wallet?: boolean
          p_notes?: string
          p_override_amount?: number
          p_scope?: Json
          p_trading_account_id?: string
          p_user_id?: string
          p_wallet_id?: string
        }
        Returns: {
          base_amount: number
          calc_method: Database["public"]["Enums"]["fee_calc_method"] | null
          computed_amount: number
          created_at: string
          created_by: string | null
          currency: Database["public"]["Enums"]["wallet_currency"]
          fee_type: Database["public"]["Enums"]["fee_type"]
          id: string
          idempotency_key: string
          journal_entry_id: string | null
          lots: number | null
          metadata: Json
          notes: string | null
          rule_id: string | null
          schedule_id: string | null
          source_id: string | null
          source_type: string | null
          status: Database["public"]["Enums"]["fee_charge_status"]
          trading_account_id: string | null
          updated_at: string
          user_id: string | null
          wallet_id: string | null
          wallet_tx_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "fee_charges"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      staff_distribute_rebate: {
        Args: {
          p_idempotency_prefix: string
          p_lots: number
          p_source_user_id: string
          p_trading_account_id: string
        }
        Returns: number
      }
      staff_post_journal_entry: {
        Args: {
          p_description?: string
          p_idempotency_key: string
          p_lines: Json
          p_metadata?: Json
          p_reference?: string
        }
        Returns: string
      }
    }
    Enums: {
      account_kind: "demo" | "live" | "copy" | "prop" | "managed"
      account_status: "active" | "archived" | "suspended"
      audit_action: "INSERT" | "UPDATE" | "DELETE"
      chat_status: "open" | "active" | "closed"
      crm_activity_kind:
        | "note"
        | "call"
        | "email"
        | "whatsapp"
        | "sms"
        | "meeting"
        | "stage_change"
        | "assignment"
        | "system"
      crm_lead_stage:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "won"
        | "lost"
      crm_lead_status: "open" | "converted" | "lost"
      crm_task_status: "open" | "done" | "cancelled"
      fee_calc_method:
        | "flat"
        | "percentage"
        | "per_lot"
        | "spread_markup"
        | "tiered"
      fee_charge_status: "pending" | "applied" | "waived" | "reversed"
      fee_type:
        | "deposit"
        | "withdrawal"
        | "inactivity"
        | "conversion"
        | "swap"
        | "spread"
        | "commission_per_lot"
        | "management"
        | "performance"
        | "subscription"
        | "rebate"
        | "adjustment"
        | "custom"
      journal_status: "posted" | "void"
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
      ledger_account_type:
        | "asset"
        | "liability"
        | "equity"
        | "revenue"
        | "expense"
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
      chat_status: ["open", "active", "closed"],
      crm_activity_kind: [
        "note",
        "call",
        "email",
        "whatsapp",
        "sms",
        "meeting",
        "stage_change",
        "assignment",
        "system",
      ],
      crm_lead_stage: [
        "new",
        "contacted",
        "qualified",
        "proposal",
        "won",
        "lost",
      ],
      crm_lead_status: ["open", "converted", "lost"],
      crm_task_status: ["open", "done", "cancelled"],
      fee_calc_method: [
        "flat",
        "percentage",
        "per_lot",
        "spread_markup",
        "tiered",
      ],
      fee_charge_status: ["pending", "applied", "waived", "reversed"],
      fee_type: [
        "deposit",
        "withdrawal",
        "inactivity",
        "conversion",
        "swap",
        "spread",
        "commission_per_lot",
        "management",
        "performance",
        "subscription",
        "rebate",
        "adjustment",
        "custom",
      ],
      journal_status: ["posted", "void"],
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
      ledger_account_type: [
        "asset",
        "liability",
        "equity",
        "revenue",
        "expense",
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
