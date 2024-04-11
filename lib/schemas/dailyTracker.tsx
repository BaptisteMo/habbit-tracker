import { z } from "zod"


export const dailTrackerSchema = z.object({
    repos: (z.enum(["repos", "marche",""])),
    training: z.enum(["course", "boxe", "leger","muscu", "aucun",""]),
    sommeil: z.enum(["peu", "moyen", "complet",""]),
    eau: z.enum(["aucun", "peu", "complet",""]),
    repas_matin: z.enum(["aucun", "cheat","complet","incomplet",""]),
    repas_midi: z.enum(["aucun", "cheat","complet","incomplet",""]),
    repas_soir: z.enum(["aucun", "cheat","complet","incomplet",""]),
  })


  export type typeDailyTracker = z.infer<typeof dailTrackerSchema>;     