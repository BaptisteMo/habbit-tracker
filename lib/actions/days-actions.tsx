import { redirect } from "next/navigation";
import supabaseBrowser from "../supabase/browser";
import { supabaseServer } from "../supabase/server";
import { connectedUser } from "./user-actions";


export async function readDays(){
    
    const {data:user, error} = await connectedUser();
    if(!user.user?.id ){
      redirect('/auth')
    }
    const userID = user.user.id
    const supabase = supabaseServer();

    return await supabase
    .from('days')
    .select('*')
    .order('date', { ascending: false })
    .eq('userID', userID)



}




