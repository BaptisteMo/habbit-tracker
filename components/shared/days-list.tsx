
'use client'
import { Database } from '@/lib/types/supabase';
import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"


type Day = Database["public"]["Tables"]["days"]["Row"]



// Définir les props de la fonction DaysTable
export interface DaysTableProps {
  daysTable: Day[]; // Type du tableau d'éléments
}


export default function DaysList({ daysTable }: DaysTableProps) {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null)

  const handleDayClick = (day:Day) => {
    setSelectedDay(day);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-stretch gap-4 md:gap-8 lg:col-span-2">
      <Card>
          <CardHeader>
            <CardTitle>Your days</CardTitle>
          </CardHeader>
          <CardContent>
          <ScrollArea className=' bg-white'>
            <div className="flex flex-col gap-2 pt-0">
              {daysTable.map((day) => (
                <button
                  key={day.id}
                  onClick={() => handleDayClick(day)}
                  className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${selectedDay === day ? 'bg-muted' : ''}`}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="font-semibold">{day.date}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          </CardContent>
        </Card>
          
        </div>
        <div>
        <Card>
          <CardHeader>
            <CardTitle>{selectedDay ? `Détails du jour ${selectedDay.date}` : "Aucun jour sélectionné"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDay ? (
              <div>
                {/* Afficher les détails du jour sélectionné */}
                <p>Details: {selectedDay.date}</p>
              </div>
            ) : (
              <p>Sélectionnez un jour pour afficher ses détails</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}