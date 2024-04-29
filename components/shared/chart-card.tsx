'use client'
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {    
    AreaChart,
    Area,
  } from "recharts";
import { Badge } from "../ui/badge";



  interface WeightProps {
    chartForWeight : WeightForChartProps[];
  }
  type WeightForChartProps = {
    date: string;
    weight: number;
  }

export default function ChartCard({chartForWeight}: WeightProps) {
    const cardContentRef = useRef<HTMLDivElement>(null);
    const [cardContentWidth, setCardContentWidth] = useState<number | undefined>(undefined);
  
    // Fonction pour mettre à jour la largeur de CardContent
    const updateCardContentWidth = () => {
      if (cardContentRef.current) {
        setCardContentWidth(cardContentRef.current.clientWidth);
      }
    };
  
    // Mettre à jour la largeur de CardContent lorsque la taille de la fenêtre change
    useEffect(() => {
      updateCardContentWidth();
      window.addEventListener("resize", updateCardContentWidth);
      return () => {
        window.removeEventListener("resize", updateCardContentWidth);
      };
    }, []);

    function calculateWeightDifference(chartForWeight: WeightForChartProps[]): number | null {
      if (chartForWeight.length >= 2) {
          const avantDernierElement = chartForWeight[chartForWeight.length - 2];
          const dernierElement = chartForWeight[chartForWeight.length - 1];
          return dernierElement.weight - avantDernierElement.weight;
      }
      return 0; // Retourne null si les données sont insuffisantes
  }
  
  function getBadgeForWeightDifference(weightDifference :number) {
      if (weightDifference === null) {
          return <Badge variant="secondary">Pas de données disponibles</Badge>;
      } else if (weightDifference > 0) {
          return <Badge variant="destructive">+ {weightDifference}</Badge>;
      } else if (weightDifference < 0) {
          return <Badge variant="good">{weightDifference}</Badge>;
      } else {
          return <Badge variant="secondary">Aucune variation de poids</Badge>;
      }
  }
  
  function loseOrGain(chartForWeight: WeightForChartProps[]) {
      const weightDifference = calculateWeightDifference(chartForWeight);
      if (weightDifference === null) {
        return <Badge variant="secondary">Pas de données disponibles</Badge>;
      } else {
        return getBadgeForWeightDifference(weightDifference);
      }
  }





  return (
    <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">

                  <CardDescription>Suivi du poids</CardDescription>
                   {loseOrGain(chartForWeight)}
                  </div>
                  <CardTitle className="text-4xl">
                    {chartForWeight[chartForWeight.length - 1]?.weight?(

                    chartForWeight[chartForWeight.length - 1].weight
                  ):(
                      <div className="">Utilisez ⌘K</div>
                  )}
                  </CardTitle>
                  
                </CardHeader>
                <CardContent ref={cardContentRef}>
                {chartForWeight[chartForWeight.length - 1]?.weight?(

                    <AreaChart width={cardContentWidth? - 48 : 200} height={50} data={chartForWeight}>
                    <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    </defs>
                      <Area type="monotone" dataKey="weight" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                    </AreaChart>
                  ):(
                    <div className="">Aller à la pesée ! 🏋️</div>
                  )}

                </CardContent >
              </Card>
  )
}
