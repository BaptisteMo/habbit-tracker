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
import DailyTrack from "../../form/daily-track"
import WeightTrack from "../../form/weight-track"
import { Database } from "@/lib/types/supabase"
import { Button } from "@/components/ui/button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { PlusCircle } from "lucide-react"
  
type Day = Database["public"]["Tables"]["days"]["Row"]
type Weight = Database["public"]["Tables"]["weight"]["Row"]

interface CommandProps {
    DayInfos : Day[],
    WeightInfo : Weight[],
    UserID : string,  
}



export function PhoneForms({WeightInfo, UserID, DayInfos} : CommandProps ) {

  
    return (

            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                    variant={"default"}
                    size={"fit"}
                    className="flex flex-col gap-1 transition-all p-2 text-xs"
                >
                <PlusCircle className='animation-fade m-auto' />
                Ajouter
                </Button>              
                </DrawerTrigger>
                    <DrawerContent>
                        <div className='max-h-[80vh] overflow-scroll p-4'>
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
                        </div>

                </DrawerContent>
            </Drawer>

    )
  }
  