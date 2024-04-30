"use client"



import React, { Suspense } from 'react'
import {KeyRound} from "lucide-react"

import { Button } from '@/components/ui/button'
import supabaseBrowser from '@/lib/supabase/browser'
import { useSearchParams } from 'next/navigation'

export default function AuthComponent() {

    const params = useSearchParams();
	const next = params.get("next") || "";

    const handleLoginWithOAuth = () => {
        const supabase = supabaseBrowser();


        const getURL = () => {
            let url =
              process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
              process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
              'http://localhost:3000/'
            // Make sure to include `https://` when not localhost.
            url = url.includes('http') ? url : `https://${url}`
            // Make sure to include a trailing `/`.
            url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
            return url
          }
          supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: getURL(),
            },
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
                    onClick={() => handleLoginWithOAuth()}
                    >
                        Google
                    </Button>
                </div>
            </div>
  )
}
