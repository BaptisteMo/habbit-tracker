import { TypedSupabaseClient } from "../utils/types";


export function getCountryById(client: TypedSupabaseClient, userID: number) {
  return client
    .from('days')
    .select(
            '*'
    )
    .eq('id', userID)
    .order('date', { ascending: false })
    .throwOnError()
}