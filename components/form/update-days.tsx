'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Database } from '@/lib/types/supabase'
import { dailyUpdateTrackerSchema, typeUpdateDailyTracker } from "@/lib/schemas/dailyTracker"
import {repas, sommeil, training, eau } from "@/lib/constant"

import React, { useState } from 'react'
import supabaseBrowser from "@/lib/supabase/browser"
import { useToast } from "../ui/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Slider } from "../ui/slider"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Toaster } from "../ui/toaster"


type Day = Database["public"]["Tables"]["days"]["Row"]


interface dayUpdateProps{

    day: Day
}

export default function UpdateDays({day}: dayUpdateProps ) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { toast } = useToast()

    const form = useForm<typeUpdateDailyTracker>({
        resolver: zodResolver(dailyUpdateTrackerSchema),
        defaultValues :{
          number_steps: day.number_steps,
          commentary: day.commentary || "",
          training:day.training,
          sommeil:day.sommeil,
          eau:day.eau,
          repas_matin:day.repas_matin ,
          repas_midi:day.repas_midi ,
          repas_soir:day.repas_soir ,
        }
      })

      async function onSubmit(values: typeUpdateDailyTracker) {


        setIsSubmitted(true); 


        const getStepValue = (steps: number): { text: string, score: number } => {
            let text: string;
            let score: number;
        
            if (steps >= 0 && steps <= 5000) {
                text = "Mauvais";
                score = -1;
            } else if (steps >= 5001 && steps <= 9000) {
                text = "Moyen";
                score = 1;
            } else if (steps >= 9001 && steps <= 12000) {
                text = "Bien";
                score = 2;
            } else if (steps >= 12001 && steps <= 20000) {
                text = "Très bien";
                score = 3;
            } else {
                text = "Inconnu";
                score = 0; // ou une autre valeur par défaut si nécessaire
            }
        
            return { text, score };
        };
        
        const stepResult = getStepValue(values.number_steps);

        // Rechercher si la date sélectionnée existe déjà dans daysInfos

        const scoreTraining = training.find(item => item.value === values["training"])?.score ?? 0;
        const scoreSommeil = sommeil.find(item => item.value === values["sommeil"])?.score ?? 0;
        const scoreEau = eau.find(item => item.value === values["eau"])?.score ?? 0;
        const scoreRepasMatin = repas.find(item => item.value === values["repas_matin"])?.score ?? 0;
        const scoreRepasMidi = repas.find(item => item.value === values["repas_midi"])?.score ?? 0;
        const scoreRepasSoir = repas.find(item => item.value === values["repas_soir"])?.score ?? 0;


        const totalScore = stepResult.score + scoreTraining + scoreSommeil + scoreEau + scoreRepasMatin + scoreRepasMidi + scoreRepasSoir;




            const supabase = supabaseBrowser()

                const { error } = await supabase.from('days').update({
                    steps:stepResult.text,
                    number_steps: values.number_steps,
                    steps_score: stepResult.score,
                    training: values.training,
                    sommeil: values.sommeil,
                    eau: values.eau,
                    repas_matin: values.repas_matin,
                    repas_midi: values.repas_midi,
                    repas_soir: values.repas_soir,
                    commentary: values.commentary,

        
                    score_training: scoreTraining,
                    score_sommeil: scoreSommeil,
                    score_eau: scoreEau,
                    score_matin: scoreRepasMatin,
                    score_midi: scoreRepasMidi,
                    score_soir: scoreRepasSoir,
                    total_day: totalScore,
                }).eq('id', day.id);
                toast({
                    description: <span>Mise à jour effectuée pour le : <span className="font-bold">{day.date}</span></span>,
                });
            
        
        

            setTimeout(() => {
                setIsSubmitted(false); // Réactiver le formulaire
                window.location.reload(); // Recharger la page pour afficher la nouvelle donnée
            }, 2000);
        }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField
                    control={form.control}
                    name="number_steps"
                    render={({ field: { value, onChange } }) => (
                    <FormItem>
                        <FormLabel>Nombre de pas : <span className="font-bold text-primary py-1 px-2 bg-primary/15 rounded-md ">{value}</span></FormLabel>
                        <FormControl>
                        <Slider
                            min={0}
                            max={20000}
                            step={4}
                            defaultValue={[value]}
                            onValueChange={(vals) => {
                              onChange(vals[0]);
                            }}
                        />
                        </FormControl>
                        <FormDescription>
                        This is a description for the price.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="sommeil"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Sommeil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {sommeil.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="training"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Training</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {training.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="repas_matin"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Petit dej</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {repas.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="repas_midi"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Midi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {repas.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="repas_soir"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Dîner</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {repas.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="eau"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Eau</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {eau.map((item,index)=>(
                            <SelectItem 
                            key={index}
                            value={item.value}>{item.nom}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="commentary"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Commentaire</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Un commentaire sur cette journée, pour te souvenir des éléments importants ?"
                        className="resize-none"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                    <Button
                    type="submit"
                    disabled={isSubmitted}
                    variant="default"
                    className="mt-4"
                    >
                    {isSubmitted ? "Envoi en cours..." : "Envoyer"}
                    </Button>

                </form>
        </Form>
        <Toaster />

    </div>
  )
}
