import supabaseBrowser from "../supabase/browser";

export async function SupprDay(dayID:string){
    

    const supabase = supabaseBrowser();

    try {
        await supabase.from('days').delete().eq('id', dayID);
        console.log("Day deleted successfully");
    } catch (error) {
        console.error("Error deleting day:");
    }

}

