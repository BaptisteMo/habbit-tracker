"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useUser from '@/app/hook/useUser';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import supabaseBrowser from '@/lib/supabase/browser';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';


import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  MoonIcon,
  Plus,
  PlusCircle,
  Settings,
  SunIcon,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes';
import { protectedPaths } from '@/lib/constant';



export default function Profile() {

  const { setTheme } = useTheme() 
  const queryClient = useQueryClient();
  const { isFetching , data } = useUser();



  const router = useRouter();

  const pathname = usePathname();

if(isFetching){

  return <></>
}

const handleLogout = async () => {
  const supabase = supabaseBrowser();
  queryClient.clear();

  await supabase.auth.signOut();

  router.refresh();

  if(protectedPaths.includes(pathname)){
    router.replace("/auth?next="+pathname)

  }else{

  }

}



  return (
    <div>
      {!data?.id ? 
            (<Link href="/auth" className='animation-fade'>
                <Button variant={'outline'}>
                  Log In
                </Button>
              </Link>) 
              : 
              (
                <DropdownMenu>
                <DropdownMenuTrigger>
                      <Avatar className='animation-fade'>
                        <AvatarImage src={data.image_url || ""} alt={data.display_name || ""}/>
                        <AvatarFallback className='animation-fade'>BM</AvatarFallback>
                      </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/*  ---- Profile item ----- */}
                    <Link href='/profile'>
                        <DropdownMenuItem className='cursor-pointer'> 

                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>

                    {/*  ---- Setting ---- */}
                    <DropdownMenuItem className='cursor-pointer'> {/* Settings */}
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SunIcon className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span>Switch theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>

                  </DropdownMenuSub>
                  <DropdownMenuSeparator />

                  {/*  ---- Logout ---- */}
                  <DropdownMenuItem
                  onClick = {handleLogout}
                  className='cursor-pointer'
                  >
                    <LogOut 
                    className="mr-2 h-4 w-4"
                    />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
      
    </div>
    
  )
}
  