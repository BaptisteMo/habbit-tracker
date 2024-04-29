
import { cp } from "fs";
import { supabaseServer } from "../supabase/server";
import { connectedUser } from "./user-actions";
import { redirect } from "next/navigation";

export async function readWeight(){
    
    const {data:user, error} = await connectedUser();
    if(!user.user?.id ){
      redirect('/auth')
    }
    const userID = user.user.id
    const supabase = supabaseServer();

    return await supabase
    .from('weight')
    .select('*')
    .order('date', { ascending: false })
    .eq('user_id', userID)

}
export async function LastFiveWeight(){
    
    const {data:user, error} = await connectedUser();
    if(!user.user?.id ){
      redirect('/auth')
    }
    const userID = user.user.id
    const supabase = supabaseServer();

    return await supabase
    .from('weight')
    .select('date, weight')
    .order('date', { ascending: true })
    .limit(5)
    .eq('user_id', userID)

}

