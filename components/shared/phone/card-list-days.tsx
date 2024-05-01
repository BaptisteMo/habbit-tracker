'use client'
import UpdateDays from '@/components/form/update-days';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SupprDay } from '@/lib/actions/delete-actions';
import { Database } from '@/lib/types/supabase';
import { Edit2Icon, Trash } from 'lucide-react';



interface PropsDays {
    daysInfos: Day[]; // Type du tableau d'éléments

  }

type Day = Database["public"]["Tables"]["days"]["Row"]

export default function PhoneCardDay({ daysInfos }: PropsDays) {

    const handleDayClick = (dayID : string) => {
        SupprDay(dayID);
        window.location.reload();         

    }
  
  return (
    <div className='p-4'>
        <ScrollArea className="sm:hidden w-full " >
            <div className="flex w-max space-x-4 ">

            {daysInfos.map((dayInfos, index)=>{
                interface dayInfoProps{
                    dayInfos: Database["public"]["Tables"]["days"]["Row"]
                }
                function getBadgeForDayEval({ dayInfos }: dayInfoProps) {

                    if(dayInfos){
                
                    if (dayInfos.total_day > 16) {
                        return <Badge variant="good">Excellente journée !</Badge>;
                    } else if (dayInfos.total_day > 10 && dayInfos.total_day < 16) {
                        return <Badge variant="secondary"> Jour moyen</Badge>;
                    } else {
                        return <Badge variant="destructive">Mauvaise journée !</Badge>;
                    }
                    
                    }
                
                }
                return(
                    <Card 
                    key={dayInfos.id}
                    className='flex flex-col items-stretch w-[80vw]'>
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid w-full gap-0.5">
                            <CardTitle className="group w-full text-lg">
                                <div className='flex flex-col w-full justify-between items-start gap-4'>
                                    {getBadgeForDayEval({ dayInfos: dayInfos })}    
                                    <span>Détail de la journée ☀️</span>
        
                                </div>
                            </CardTitle>
                            <CardDescription>
                                {dayInfos.date}

                            </CardDescription>

                            </div>
                        </CardHeader>
                        <div className='h-full flex flex-col justify-between'>
                            <CardContent className='flex break-word flex-col items-start gap-4 mt-4'>
                                <Badge variant="secondary">{dayInfos.training}</Badge>
                                <div className='flex w-full'>{dayInfos.commentary}</div>
                            </CardContent>
                            <CardFooter>
                                <div className='w-full flex justify-stretch'>
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button
                                            variant={"secondary"}
                                            className='w-full'
                                            >
                                                <Edit2Icon className="h-4 w-4 m-2" />
                                                Editer
                                            </Button>                
                                        </DrawerTrigger>
                                            <DrawerContent>
                                            <DrawerHeader>
                                            <DrawerTitle>Mettre à jour {dayInfos.date}</DrawerTitle>
                                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                            </DrawerHeader>

                                                <div className='max-h-[60vh] overflow-scroll p-4'>
                                                    <UpdateDays day={dayInfos} />

                                                </div>

                                        </DrawerContent>
                                    </Drawer>
                                    
                                    <Button 
                                        variant="destructive"
                                        
                                        onClick= {() => handleDayClick(dayInfos.id)}
                                        className="ml-2 w-full"
                                    >   
                                        Supprimer
                                        <Trash className="h-4 w-4 m-2" />

                                    </Button>
                                </div>
                            </CardFooter>
                        </div>

                    </Card>
                );  
            })}
            </div>
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
        )
}
