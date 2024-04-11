"use client"
import React from 'react'
import {KeyRound} from "lucide-react"

import { Button } from '@/components/ui/button'
import supabaseBrowser from '@/lib/supabase/browser'
import { useSearchParams } from 'next/navigation'

export default function Auth() {

    const params = useSearchParams();
    const next = params.get("next");

    const handleLoginWithOAuth = (provider : "google") => {
        console.log(next)
        const supabase = supabaseBrowser();


            let redirectTo = location.origin + "/auth/callback";

            if (next) {
                redirectTo += "?next=" + next;
            }

        supabase.auth.signInWithOAuth({
            provider,

            options: {
                redirectTo
            }
        })

    }

  return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='w-96 rounded-md border p-5 space-y-5'>
                <div className='flex items-center gap-2'>
                    <KeyRound />
                    <h1 className="text-2xl font-bold">
                        Auth page
                    </h1>
                </div>
                <Button 
                variant='secondary' 
                className='block w-full'
                onClick={() => handleLoginWithOAuth("google")}
                >
                    Google
                </Button>
            </div>
        </div>

  )
}