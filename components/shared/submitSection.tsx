'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Copy, MoreVertical, Truck } from "lucide-react"
import { Button } from "../ui/button"
import DailyTrack from "../form/daily-track";
import { useEffect, useState } from 'react';
import { Database } from "@/lib/types/supabase"

import { format } from "date-fns"




interface PropsUserCo {
  currentUserID: string;
  daysTable: Day[]; // Type du tableau d'éléments

}

type Day = Database["public"]["Tables"]["days"]["Row"]




export default function SubmitSection({ currentUserID, daysTable }: PropsUserCo) {
  const [currentDateDDMMYY, setCurrentDateDDMMYY] = useState('');
  const [currentDateYYYYMMDD, setCurrentDateYYYYMMDD] = useState('');



  const lastDay = format(new Date(daysTable[0].created_at), 'dd/MM/yy');

  useEffect(() => {
    const updateCurrentDate = () => {
      const today = new Date();

      // Format "DD-MM-YY"
      const optionsDDMMYY = { day: '2-digit', month: '2-digit', year: '2-digit' };
      const formattedDateDDMMYY = today.toLocaleDateString('en-GB', optionsDDMMYY);

      // Format "YYYY-MM-DD"
      const formattedDateYYYYMMDD = `${today.getFullYear()}-${(today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1)}-${(today.getDate() < 10 ? '0' : '') + today.getDate()}`;
 

      setCurrentDateDDMMYY(formattedDateDDMMYY);
      setCurrentDateYYYYMMDD(formattedDateYYYYMMDD);
    };

    updateCurrentDate();

    const intervalId = setInterval(updateCurrentDate, 1000 * 60 * 60 * 24);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card
    className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
  >
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
        <CardTitle className="group flex items-center gap-2 text-lg">
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Order ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Dernière mise à jour le: {lastDay}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="p-6 text-sm">
      <DailyTrack 
      userConnectedID={currentUserID}
      todayDate={currentDateYYYYMMDD}
      daysInfos ={daysTable}
      />
    </CardContent>
    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">
        Updated <time dateTime="2023-11-23">November 23, 2023</time>
      </div>
    </CardFooter>
  </Card>
  )
}

