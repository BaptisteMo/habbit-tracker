"use client"

import React from "react"
import {

    CommandDialog,
    CommandGroup,
    CommandList,

  } from "@/components/ui/command"

  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import DailyTrack from "../form/daily-track"
import WeightTrack from "../form/weight-track"
import { Database } from "@/lib/types/supabase"
import { Button } from "@/components/ui/button"
  
type Day = Database["public"]["Tables"]["days"]["Row"]
type Weight = Database["public"]["Tables"]["weight"]["Row"]

interface CommandProps {
    DayInfos : Day[],
    WeightInfo : Weight[],
    UserID : string,  
}



export function CommandMenu({WeightInfo, UserID, DayInfos} : CommandProps ) {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(true);
    }
  
    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
  
    return (

        <div className="w-full">

            <Button
                onClick={() => handleClick()}
                className="w-full gap-2"
            >
              <span className="font-bold ">⌘K</span> Nouvelle entrée
            </Button>
        <CommandDialog open={open} onOpenChange={setOpen} >
            <CommandList className="w-[700]">
            <CommandGroup>
            <Tabs defaultValue="days">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="days">Les journées</TabsTrigger>
                <TabsTrigger value="weight">Le poids</TabsTrigger>
            </TabsList>
            <TabsContent value="days">
                <Card>
                <CardHeader>
                    <CardTitle>Daily track</CardTitle>
                    <CardDescription>
                    Enregistre de tes journées
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <DailyTrack
                    userConnectedID= {UserID}
                    daysInfos = {DayInfos}
                    />
                </CardContent>

                </Card>
            </TabsContent>
            <TabsContent value="weight">
                <Card>
                <CardHeader>
                    <CardTitle>Nouvelle mesure de poid</CardTitle>
                    <CardDescription>
                    Définir un nouveau poid
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <WeightTrack
                        userConnectedID= {UserID}
                        weightInfos = {WeightInfo}
                    />
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
            </CommandGroup>
            </CommandList>
        </CommandDialog>

      </div>
    )
  }
  