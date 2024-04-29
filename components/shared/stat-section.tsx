'use client'
import { Database } from '@/lib/types/supabase';
import StatCard from './stat-card';
import ChartCard from './chart-card';


interface PropsDays {
    daysInfos: Day[]; // Type du tableau d'éléments
    weightForChart: WeightForChart[];
  }

type Day = Database["public"]["Tables"]["days"]["Row"]
type WeightForChart = {
  date: string;
  weight: number;
}


export default function StatSection({ daysInfos, weightForChart }: PropsDays) {




  const finalObjectif = 50


      // Filtrer les jours ayant un score total supérieur à 16
      const goodDaysCount = daysInfos.filter(day => {
        const totalScore = day.total_day;
        return totalScore > 16;
    }).length;
      const BadDaysCount = daysInfos.filter(day => {
        const totalScore = day.total_day;
        return totalScore > 13;
    }).length;

  const totalDaysCount = daysInfos.length;
  const goodDaysPercentage = Math.floor((goodDaysCount / totalDaysCount) * 100) || 0;


  console.log(goodDaysPercentage)
  
  return (
    <div className="grid p-4 sm:px-6 sm:py-0 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard 
        mainNumber= {goodDaysCount}
        statBar={goodDaysPercentage}
        title= 'Nombres de jours réussi !'
        
        />
        <ChartCard 
         chartForWeight= {weightForChart}
        
        />
        
  </div>
  )
}
