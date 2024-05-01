'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { typeWeightTracker, weightTrackerSchema } from '@/lib/schemas/dailyTracker'
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

  import { format } from "date-fns"
  import { cn } from "@/lib/utils"
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import { Database } from '@/lib/types/supabase'
import supabaseBrowser from '@/lib/supabase/browser'

interface PropsUserCo {
    userConnectedID: string;
    weightInfos: Weight[]; // Type du tableau d'éléments

  }

type Weight = Database["public"]["Tables"]["weight"]["Row"]


export default function WeightTrack({ userConnectedID, weightInfos }: PropsUserCo) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { toast } = useToast()

    const userID = userConnectedID;


    const form = useForm<typeWeightTracker>({
        resolver: zodResolver(weightTrackerSchema),
        defaultValues:{
            weight: 80
        }
      })
    


    async function onSubmit(values: typeWeightTracker) {
        setIsSubmitted(true)
    
        const selectedDate = format(new Date(values.date), 'yyyy-MM-dd');
        const existingDay = weightInfos.find(weight => weight.date === selectedDate);



        const supabase = supabaseBrowser()


        if (existingDay) {
            const { error } = await supabase.from('weight').update({
                date: selectedDate,
                weight: values.weight
            }).eq('id', existingDay.id);
            toast({
                description: <span>Le poid à été mis à jour pour le : <span className="font-bold">{selectedDate}</span></span>,
            });
        
    
            if (error) {
                console.error('Erreur lors de la mise à jour:', error.message);
            } else {
                console.log('Jour mis à jour avec succès !');
            }
        } else {
            // Sinon, insérer une nouvelle entrée dans la base de données
            const { error } = await supabase.from('weight').insert({
                date: selectedDate,
                weight: values.weight,
                user_id: userID
            });

    
            if (error) {
                console.error('Erreur lors de l\'insertion:', error.message);
            } else {
                console.log('Jour inséré avec succès !');
                toast({
                    description: <span>Vous pesez <span className="font-bold">{values.weight}</span> le : <span className="font-bold">{selectedDate}</span></span>,
                });
            
        
            }
        }

        setTimeout(() => {
            setIsSubmitted(false); // Réactiver le formulaire
            form.reset(); // Réinitialiser les valeurs du formulaire
        }, 2000);
    
    
      }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Journée</FormLabel>
                    <Popover modal={true}>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "dd/MM/yy")
                            ) : (
                                <span>Sélectionne une journée</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Poids</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="shadcn"
                                type='number'
                                
                                {...field} />
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
