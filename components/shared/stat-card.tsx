'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress';

import { Badge } from '../ui/badge';


  interface PropsDays {
    mainNumber : number,
    statBar : number,
    title : string,
  }

export default function StatCard({mainNumber, statBar, title }: PropsDays) {


  return (
    <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>{title}</CardDescription>
                  <CardTitle className="text-4xl">{mainNumber} 🔥</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    
                  </div>
                </CardContent>
                <CardFooter className='gap-4'>


                    <Progress value={statBar} aria-label='Objectif !' />
                    
                    <Badge variant="secondary"> {statBar}%</Badge>

                </CardFooter>
              </Card>
  )
}
