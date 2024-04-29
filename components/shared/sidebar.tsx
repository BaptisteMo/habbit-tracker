'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NavigationLinks, protectedPaths } from "@/lib/constant"
import { redirect, usePathname, useRouter } from 'next/navigation';



import { 
  CircleUser,
  LogIn,
  LogOut,
  MoonIcon,
  Package2, 
  
  SunIcon,
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
import { connectedUser } from "@/lib/actions/user-actions";
import { Database } from "@/lib/types/supabase";
import { CommandMenu } from "./command-form";
import { Button } from "../ui/button";

type Day = Database["public"]["Tables"]["days"]["Row"]
type Weight = Database["public"]["Tables"]["weight"]["Row"]

interface PropsUserCo {
  userConnectedID: string,
  DayInfos : Day[],
  WeightInfos : Weight[],
}


export default function Sidebar({ userConnectedID, DayInfos, WeightInfos}: PropsUserCo){


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
    <aside className="fixed p-4 inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-start gap-4 sm:py-5">
        <CommandMenu 
            WeightInfo ={WeightInfos}
            UserID={userConnectedID} 
            DayInfos= {DayInfos}
          />


          {NavigationLinks.map((item, index)=>(
            <TooltipProvider
            key={index}
            >

            <Tooltip>
              <TooltipTrigger asChild>
              <Button
                  variant="ghost"
                  className={`w-full text-muted-foreground transition-colors hover:text-foreground ${
                    pathname === item.link ? 'bg-accent text-foreground' : '' // Vérifiez si le lien est actif
                  }`}
                >
                  <Link
                    href={item.link}
                    className="flex w-full gap-2 justify-start"
                  >
                    {createElement(item.icon, { className: "h-5 w-5" })}
                    {item.name}
                  </Link>

                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
            </TooltipProvider>
          ))}



        </nav>
        <nav className="mt-auto">

        {!userConnectedID ? 
            (<Link 
              href="/auth"  
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
              >
                <LogIn className="h-5" />
              </Link>
            )
              : 
              (
              <nav className="flex gap-4 flex-col items-start">
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Link
                    href={`/profile/${userConnectedID}`}
                    className="flex w-full gap-2 justify-start items-center"
                  >
                    <CircleUser className='animation-fade' />
                    Profile
                  </Link>

                </Button>
                <TooltipProvider
                >
                <Tooltip>
                  <TooltipTrigger asChild>

                    <Button
                    variant="ghost"
                    className="w-full text-muted-foreground transition-colors hover:text-foreground"
                    onClick = {handleLogout}
                  >
                    <Link
                      href={`/profile/${userConnectedID}`}
                      className="flex w-full gap-2 justify-start items-center"
                    >
                      <LogOut className='animation-fade' />
                      Deconnexion
                    </Link>

                  </Button>

                  </TooltipTrigger>
                  <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex w-full text-sm font-medium rounded-md px-4 py-2 gap-2 items-center text-muted-foreground hover:text-foreground hover:bg-muted">
                  <div className="flex w-full gap-2  items-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                    <SunIcon className="h-6 w-6 " />
                    <span>Thème clair</span>
                  </div>

                  <div className="flex gap-2  items-center absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                    <MoonIcon className="h-6 w-6" />
                    <span >Thème foncé</span>
                  </div>


                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuLabel>Switch Them</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </nav>  
              )}



        </nav>
      </aside>
  )
}
