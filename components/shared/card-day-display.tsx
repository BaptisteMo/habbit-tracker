import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'



import { Separator } from '../ui/separator'

import { Database } from '@/lib/types/supabase'
import { Badge } from '../ui/badge'


type Day = Database["public"]["Tables"]["days"]["Row"]

export interface daySelectedProps {
    daySelectedInfos: Day | null; // Type du tableau d'éléments
  }


export default function CardDayDisplay({daySelectedInfos}: daySelectedProps) {

  function getBadgeForDayEval({daySelectedInfos}: daySelectedProps) {

    if(daySelectedInfos){

      if (daySelectedInfos.total_day > 16) {
          return <Badge variant="good">Excellente journée !</Badge>;
      } else if (daySelectedInfos.total_day > 10 && daySelectedInfos.total_day < 16) {
          return <Badge variant="secondary"> Jour moyen</Badge>;
      } else {
          return <Badge variant="destructive">Mauvaise journée !</Badge>;
      }
      
    }

}



  return (
          <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid w-full gap-0.5">
                  <CardTitle className="group w-full flex items-center gap-2 text-lg">
                    {daySelectedInfos?.date ? (
                      <div className='flex w-full justify-between'>
                        <span>Détail de la journée ☀️</span>
                        {getBadgeForDayEval({ daySelectedInfos: daySelectedInfos })}
                      </div>
                    ) : (
                      <div className='flex w-full justify-between'>

                        <span>Détail de la journée ☀️</span>
                        <Badge variant='secondary' className='text-lg'>🤷‍♂️</Badge>
                        </div>
                    )}
                  </CardTitle>
                  <CardDescription>
                  {daySelectedInfos?.date ? (
                        daySelectedInfos.date
                    ) : (
                        <span>Sélectionnez une date 🗓️</span>
                    )}
                  </CardDescription>

                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
              {daySelectedInfos?.date ? (
                <div>
                  <div className="grid gap-3">
                  <div className="font-semibold">Activité</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>😴</span> Qualité du sommeil 
                      </span>
                      {daySelectedInfos?.sommeil ? (
                        <Badge variant="secondary">{daySelectedInfos.sommeil}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>🚶‍♂️‍➡️</span> Marche 
                      </span>
                      {daySelectedInfos?.steps_score ? (
                        <Badge variant="secondary">{daySelectedInfos.number_steps}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>🥊</span> Entrainement
                      </span>
                      {daySelectedInfos?.training ? (
                        <Badge variant="secondary">{daySelectedInfos.training}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Repas</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>☕️</span> Repas du matin
                      </span>
                      {daySelectedInfos?.repas_matin ? (
                        <Badge variant="secondary">{daySelectedInfos.repas_matin}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>🥗</span> Repas du midi 
                      </span>
                      {daySelectedInfos?.repas_midi ? (
                        <Badge variant="secondary">{daySelectedInfos.repas_midi}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>🍜</span> Repas du soir 
                      </span>
                      {daySelectedInfos?.repas_soir ? (
                        <Badge variant="secondary">{daySelectedInfos.repas_soir}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      <span className='text-lg'>💧</span> Eau 
                      </span>
                      {daySelectedInfos?.eau ? (
                        <Badge variant="secondary">{daySelectedInfos.eau}</Badge>
                    ) : (
                        <span>Pouet</span>
                    )}
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Commentaire 📝</div>

                      {daySelectedInfos?.commentary ? (
                        daySelectedInfos.commentary
                    ) : (
                        <span>Pouet</span>
                    )}

                </div>
                </div>
                    ) : (
                        <span
                        className='h-[430px] flex text-center items-center justify-center text-muted-foreground text-lg'
                        >Sélectionnez une journée ou ajoutez-en une avec ⌘K
                        </span>
                    )}

              </CardContent>

            </Card>
  )
}
