import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/supabase.ts'

export type TypedSupabaseClient = SupabaseClient<Database>