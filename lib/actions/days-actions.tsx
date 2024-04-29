import supabaseBrowser from "../supabase/browser";
import { supabaseServer } from "../supabase/server";


export async function readDays(userID:string){
    

    const supabase = supabaseServer();

    return await supabase
    .from('days')
    .select('*')
    .order('date', { ascending: false })
    .eq('userID', userID)



}

export async function SupprDay(dayID:string){
    

    const supabase = supabaseBrowser();

    try {
        await supabase.from('days').delete().eq('id', dayID);
        console.log("Day deleted successfully");
    } catch (error) {
        console.error("Error deleting day:");
    }

}

