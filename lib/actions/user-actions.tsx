
import { redirect } from "next/navigation";
import supabaseBrowser from "../supabase/browser";
import { supabaseServer } from "../supabase/server";


export async function connectedUser(){
    const supabase = supabaseServer();

    
   return await supabase.auth.getUser()

}

export async function userData(){
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser()

    if(!user?.id){
        redirect('/auth')
      }

    return await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single()

}
