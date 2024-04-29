"use client"



import React, { Suspense } from 'react'
import {KeyRound} from "lucide-react"

import { Button } from '@/components/ui/button'
import supabaseBrowser from '@/lib/supabase/browser'
import { useSearchParams } from 'next/navigation'

export default function AuthComponent() {

    const params = useSearchParams();
    const next = params.get("next");

    const handleLoginWithOAuth = (provider : "google") => {
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
    <>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    </>
  )
}