import { date, z } from "zod"


export const dailTrackerSchema = z.object({
    date : z.date(),
    commentary : z.string(),
    number_steps: z.number().min(0, {
      message: "Minimum 0"
    }).max(20000,{
      message: "Max 20k"
    }).default(0),
    training: z.enum(["Course", "Boxe", "Léger","Musculation", "Aucun",""]),
    sommeil: z.enum(["Peu", "Moyen", "Complet",""]),
    eau: z.enum(["Aucun", "Peu", "Complet",""]),
    repas_matin: z.enum(["Aucun", "Cheat","Complet","Incomplet",""]),
    repas_midi: z.enum(["Aucun", "Cheat","Complet","Incomplet",""]),
    repas_soir: z.enum(["Aucun", "Cheat","Complet","Incomplet",""]),
  })


export type typeDailyTracker = z.infer<typeof dailTrackerSchema>;     

export const weightTrackerSchema = z.object({
    date : z.date(),
    weight: z.coerce.number()
  })


export type typeWeightTracker = z.infer<typeof weightTrackerSchema>;     


export const dailyUpdateTrackerSchema = z.object({

  commentary : z.string(),
  number_steps: z.number().min(0, {
    message: "Minimum 0"
  }).max(20000,{
    message: "Max 20k"
  }).default(0),
  training: z.string(),
  sommeil: z.string(),
  eau: z.string(),
  repas_matin: z.string(),
  repas_midi: z.string(),
  repas_soir: z.string(),
})







// score_training: scoreTraining,
// score_sommeil: scoreSommeil,
// score_eau: scoreEau,
// score_matin: scoreRepasMatin,
// score_midi: scoreRepasMidi,
// score_soir: scoreRepasSoir,
// total_day: totalScore,

export type typeUpdateDailyTracker = z.infer<typeof dailyUpdateTrackerSchema>; 