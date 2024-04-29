'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuContent } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ListFilter, File, RefreshCcwDot } from 'lucide-react'

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

import { Database } from '@/lib/types/supabase'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, format } from 'date-fns';
import { Weeklymessages } from '@/lib/constant'
import CardDayDisplay from './card-day-display'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdateDays from '../form/update-days'

type Day = Database["public"]["Tables"]["days"]["Row"]
type Checked = DropdownMenuCheckboxItemProps["checked"]


// Définir les props de la fonction DaysTable
interface DaysTableProps {
  daysTable: Day[]; // Type du tableau d'éléments
}


export default function DaysTable({ daysTable }: DaysTableProps) {

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const [selectedDayData, setSelectedDayData] = useState<Day | null>(null);


  // Liste des messages disponibles
  const [selectedMessage, setSelectedMessage] = useState('');

  // Fonction pour sélectionner un message aléatoire parmi la liste
  const selectRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() *  Weeklymessages.length);
    setSelectedMessage( Weeklymessages[randomIndex]);
  };

  // Utilisez useEffect pour sélectionner un message aléatoire lors du chargement du composant
  useEffect(() => {
    selectRandomMessage();
  }, []);


  const handleDayClick = (daySelected:Day) => {
    setSelectedDayData(daySelected);
  };




  const getBadgeDetails = (totalDay:number) => {
    let variant: "bad" | "good" | "default"; 
    let text:string;
    if (totalDay >= 5 && totalDay <= 7) {
        variant = "bad";
        text = 'Mauvais';
    } else if (totalDay >= 8 && totalDay <= 15) {
        variant = 'good';
        text = 'Bon';
    } else {
        variant = 'default'; // Variant par défaut si aucune condition n'est satisfaite
        text = 'Inconnu';
    }
    return { variant, text };
};

const filterCurrentWeekDays = (daysInfos: Day[]) => {
  const today = new Date();
  const startOfWeekDate = startOfWeek(today);
  const endOfWeekDate = endOfWeek(today);
  
  return daysInfos.filter(day => {
    const currentDate = new Date(day.date);
    return isWithinInterval(currentDate, { start: startOfWeekDate, end: endOfWeekDate });
  });
}
const filterCurrentMonthDays = (daysInfos: Day[]) => {
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);
  
  return daysInfos.filter(day => {
    const currentDate = new Date(day.date);
    return isWithinInterval(currentDate, { start: startOfMonthDate, end: endOfMonthDate });
  });
}

// Cette fonction permet de filtrer les jours de l'année en cours
const filterCurrentYearDays = (daysInfos: Day[]) => {
  const today = new Date();
  const startOfYearDate = startOfYear(today);
  const endOfYearDate = endOfYear(today);
  
  return daysInfos.filter(day => {
    const currentDate = new Date(day.date);
    return isWithinInterval(currentDate, { start: startOfYearDate, end: endOfYearDate });
  });
}

// Utilisez cette fonction pour filtrer les jours de la semaine en cours
const currentWeekDays = filterCurrentWeekDays(daysTable);
const currentMonthDays = filterCurrentMonthDays(daysTable);
const currentYearDays = filterCurrentYearDays(daysTable);

  return (
    <div className='grid p-4 sm:px-6 sm:py-0  flex-1 items-start gap-4 md:gap-4 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Tabs defaultValue="week" className='flex-1'>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>

      </div>
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>{selectedMessage}</CardTitle>
            <CardDescription>
              Bon début de semaine !
          </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date du jour</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Type d'entrainement
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Activité
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Repas
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    État de la journée
                  </TableHead>
                  <TableHead className="text-right">Total day score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentWeekDays.map((day,index)=>{
                const dayDate = format(new Date(day.date), "d MMM yy")
                const { variant, text } = getBadgeDetails(day.total_day);
                const activity = day.steps_score + day.score_sommeil + day.score_training;
                const food = day.score_matin + day.score_midi + day.score_soir
                return(
                  <TableRow 
                  onClick={() => handleDayClick(day)}
                  className={`cursor-pointer ${selectedDayData === day ? 'bg-accent' : ''}`}
                  key={index}>                        

                      <TableCell>
                          <div className="font-medium">{dayDate}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {day.training}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {activity}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {food}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs w-[80px]" variant={variant}>
                          {text}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{day.total_day}</TableCell>
                      <TableCell >
                      <Sheet>
                        <SheetTrigger className='ghost-like'>

                            <RefreshCcwDot  className='h-4 w-4'/>

                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Mettre à jour {day.date}</SheetTitle>
                            <SheetDescription>
                              
                              Test
                            </SheetDescription>
                          </SheetHeader>
                          <UpdateDays day={day} />
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="month">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Recent orders from your store.
          </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date du jour</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Type d'entrainement
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Activité
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Repas
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    État de la journée
                  </TableHead>
                  <TableHead className="text-right">Total day score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMonthDays.map((day,index)=>{
                const dayDate = format(new Date(day.date), "d MMM yy")
                const { variant, text } = getBadgeDetails(day.total_day);
                const activity = day.steps_score + day.score_sommeil + day.score_training;
                const food = day.score_matin + day.score_midi + day.score_soir
                return(
                    
                    <TableRow 
                    onClick={() => handleDayClick(day)}
                    className={`cursor-pointer ${selectedDayData === day ? 'bg-accent' : ''}`}
                    key={index}
                    >
                    <TableCell>
                        <div className="font-medium">{dayDate}</div>

                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {day.training}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {activity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {food}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs w-[80px]" variant={variant}>
                        {text}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{day.total_day}</TableCell>
                    <TableCell >
                      <Sheet>
                        <SheetTrigger className='ghost-like'>

                            <RefreshCcwDot className='h-4 w-4'/>

                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Mettre à jour {day.date}</SheetTitle>
                            <SheetDescription>
                              
                              Test
                            </SheetDescription>
                          </SheetHeader>
                          <UpdateDays day={day} />
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="year">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Recent orders from your store.
          </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date du jour</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Type d'entrainement
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Activité
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Repas
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    État de la journée
                  </TableHead>
                  <TableHead className="text-right">Total day score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentYearDays.map((day,index)=>{
                const dayDate = format(new Date(day.date), "d MMM yy")
                const { variant, text } = getBadgeDetails(day.total_day);
                const activity = day.steps_score + day.score_sommeil + day.score_training;
                const food = day.score_matin + day.score_midi + day.score_soir
                return(
                    
                    <TableRow 
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`cursor-pointer ${selectedDayData === day ? 'bg-accent' : ''}`}
                    >
                    <TableCell>
                      <div className="font-medium">{dayDate}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {day.training}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {activity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {food}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs w-[80px]" variant={variant}>
                        {text}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{day.total_day}</TableCell>
                    <TableCell >
                      <Sheet>
                        <SheetTrigger className='ghost-like'>
                            <RefreshCcwDot className='h-4 w-4'/>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Mettre à jour {day.date}</SheetTitle>
                            <SheetDescription>
                              
                              Test
                            </SheetDescription>
                          </SheetHeader>
                          <UpdateDays day={day} />
                        </SheetContent>
                      </Sheet>
                    </TableCell>

                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
      </div>

    <CardDayDisplay daySelectedInfos={selectedDayData} />
  </div>
  )
}
