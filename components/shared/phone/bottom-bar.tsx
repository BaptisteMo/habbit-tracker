'use client'

import { NavigationLinks, protectedPaths } from "@/lib/constant"
import { redirect, usePathname, useRouter } from 'next/navigation';



import { 
  CircleUser,
  LogIn,
  LogOut,
  MoonIcon,
  Package2, 
  
  PlusCircle, 
  
  SunIcon,
  SunMoonIcon,
  } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { createElement } from 'react';
import supabaseBrowser from "@/lib/supabase/browser";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Database } from "@/lib/types/supabase";
import { Button } from '@/components/ui/button';
import { PhoneForms } from "./phone-forms-drawer";

type Day = Database["public"]["Tables"]["days"]["Row"]
type Weight = Database["public"]["Tables"]["weight"]["Row"]

interface InfosProps {
    userConnectedID: string,
    DayInfos : Day[],
    WeightInfos : Weight[],
  }
  
  
  export default function BottomBar({ userConnectedID, DayInfos, WeightInfos}: InfosProps){


  const pathname = usePathname();
  const { setTheme } = useTheme() 
  const queryClient = useQueryClient();





  const router = useRouter();



	const handleLogout = async () => {
		const supabase = supabaseBrowser();
		queryClient.clear();
		await supabase.auth.signOut();
		router.refresh();
		if (protectedPaths.includes(pathname)) {
			router.replace("/auth?next=" + pathname);
		}
	};
  return (
    <div className='fixed z-20 flex bottom-0 w-full bg-background sm:hidden p-4 border-t'>
    <nav className="flex gap-4 w-full justify-between items-center text-xs" >
        {NavigationLinks.map((item, index)=>(
              <Button
                  key={index}
                  variant="ghost"
                  size={"fit"}
                  className={`text-muted-foreground transition-colors hover:text-foreground py-2 px-2 ${
                    pathname === item.link ? 'bg-accent text-foreground' : '' // Vérifiez si le lien est actif
                  }`}
                >
                  <Link
                    href={item.link}
                    className="flex flex-col gap-1 text-xs"
                  >
                    {createElement(item.icon, { className: "h-5 w-5 m-auto" })}
                    {item.name}
                  </Link>

                </Button>
            ))}
            <Button
              variant="ghost"
              size={"fit"}
              className="text-muted-foreground transition-colors hover:text-foreground p-2"
            >
              <Link
                href={`/profile/${userConnectedID}`}
                className="flex flex-col gap-1 "
              >
                <CircleUser className='animation-fade m-auto' />
                Profil
              </Link>

            </Button>

                <PhoneForms
                  WeightInfo ={WeightInfos}
                  UserID={userConnectedID} 
                  DayInfos= {DayInfos}
                />
                <Button
                variant="ghost"
                size={"fit"}
                className="text-muted-foreground transition-colors hover:text-foreground p-2"
                onClick = {handleLogout}
              >
                <Link
                  href="#"
                  className="flex flex-col gap-1 text-xs"
                >
                  <LogOut className='animation-fade m-auto' />
                  Logout
                </Link>

              </Button>
            <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex text-sm font-medium items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted" >

                <div
                className="flex flex-col text-xs gap-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 p-2">
                  <SunIcon className="h-6 w-6 m-auto" />
                    Clair
                </div>
                <div
                className="    flex flex-col gap-1 text-xs absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                  <MoonIcon className="h-6 w-6 m-auto" />
                    Sombre
                </div>


            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
                <DropdownMenuItem 
                className="py-3 flex gap-2"
                onClick={() => setTheme("light")}>
                <SunIcon className="h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                className="py-3 flex gap-2"
                onClick={() => setTheme("dark")}>
                  <MoonIcon className="h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                className="py-3 flex gap-2"
                onClick={() => setTheme("system")}>
                  <SunMoonIcon className="h-4 w-4"/>
                  System
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    </nav>

    
    </div>
  )
}
