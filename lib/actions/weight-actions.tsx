
import { supabaseServer } from "../supabase/server";

export async function readWeight(){
    

    const supabase = supabaseServer();

    return await supabase
    .from('weight')
    .select('*')
    .order('date', { ascending: false })

}
export async function LastFiveWeight(){
    

    const supabase = supabaseServer();

    return await supabase
    .from('weight')
    .select('date, weight')
    .order('date', { ascending: true })
    .limit(5)

}

