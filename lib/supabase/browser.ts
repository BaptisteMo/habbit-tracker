"use client";

// import { createBrowserClient } from '@supabase/ssr'
// import { Database } from '../types/supabase';

// export default function supabaseBrowser () {
//   return createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )

// }


import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/supabase.ts'
import type { TypedSupabaseClient } from '@/lib/utils/types'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowser