
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { repos, repas, sommeil, training, eau } from "@/lib/constant"
import { CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
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
  import { Calendar } from "@/components/ui/calendar"
  import { format } from "date-fns"
  import { cn } from "@/lib/utils"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import supabaseBrowser from "@/lib/supabase/browser"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { dailTrackerSchema, typeDailyTracker } from "@/lib/schemas/dailyTracker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Database } from "@/lib/types/supabase"
import { useState } from "react"
import { Slider } from "../ui/slider"

interface PropsUserCo {
    userConnectedID: string;
    daysInfos: Day[]; // Type du tableau d'éléments

  }

type Day = Database["public"]["Tables"]["days"]["Row"]


export default function DailyTrack({ userConnectedID, daysInfos }: PropsUserCo) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { toast } = useToast()

    const userID = userConnectedID;

    

        // 1. Define your form.

        const form = useForm<typeDailyTracker>({
          resolver: zodResolver(dailTrackerSchema),
          defaultValues :{
            number_steps: 0,
            training:"Aucun",
            sommeil:"Moyen",
            eau:"Peu",
            repas_matin:"Aucun",
            repas_midi:"Incomplet",
            repas_soir:"Incomplet",
          }
        })

        async function onSubmit(values: typeDailyTracker) {

            setIsSubmitted(true); 
            console.log(values.number_steps)

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

            console.log(stepResult.score)
            console.log(stepResult.text)
                // Récupérer la date sélectionnée et formater au format dd/MM/yy
            const selectedDate = format(new Date(values.date), 'yyyy-MM-dd');

            // Rechercher si la date sélectionnée existe déjà dans daysInfos
            const existingDay = daysInfos.find(day => day.date === selectedDate);

            const scoreTraining = training.find(item => item.value === values["training"])?.score ?? 0;
            const scoreSommeil = sommeil.find(item => item.value === values["sommeil"])?.score ?? 0;
            const scoreEau = eau.find(item => item.value === values["eau"])?.score ?? 0;
            const scoreRepasMatin = repas.find(item => item.value === values["repas_matin"])?.score ?? 0;
            const scoreRepasMidi = repas.find(item => item.value === values["repas_midi"])?.score ?? 0;
            const scoreRepasSoir = repas.find(item => item.value === values["repas_soir"])?.score ?? 0;


            const totalScore = stepResult.score + scoreTraining + scoreSommeil + scoreEau + scoreRepasMatin + scoreRepasMidi + scoreRepasSoir;
        
            // console.log("Score:", totalScore);
            // console.log(daysInfos[0].date, todayDate)



            console.log(daysInfos.find(day => day.date))
            console.log(selectedDate)

                const supabase = supabaseBrowser()


                if (existingDay) {
                    const { error } = await supabase.from('days').update({
                        date: selectedDate,
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
                    }).eq('id', existingDay.id);
                    toast({
                        description: <span>Mise à jour effectuée pour le : <span className="font-bold">{selectedDate}</span></span>,
                    });
                
            
                    if (error) {
                        console.error('Erreur lors de la mise à jour:', error.message);
                    } else {
                        console.log('Jour mis à jour avec succès !');
                    }
                } else {
                    // Sinon, insérer une nouvelle entrée dans la base de données
                    const { error } = await supabase.from('days').insert({
                        date: selectedDate,
                        training: values.training,
                        sommeil: values.sommeil,
                        eau: values.eau,
                        repas_matin: values.repas_matin,
                        repas_midi: values.repas_midi,
                        repas_soir: values.repas_soir,
                        steps:stepResult.text,
                        number_steps: values.number_steps,
                        steps_score: stepResult.score,
                        commentary: values.commentary,
            
                        score_training: scoreTraining,
                        score_sommeil: scoreSommeil,
                        score_eau: scoreEau,
                        score_matin: scoreRepasMatin,
                        score_midi: scoreRepasMidi,
                        score_soir: scoreRepasSoir,
                        total_day: totalScore,
            
                        userID: userID
                    });
            
                    if (error) {
                        console.error('Erreur lors de l\'insertion:', error.message);
                    } else {
                        console.log('Jour inséré avec succès !');
                    }
                }
            

                setTimeout(() => {
                    setIsSubmitted(false); // Réactiver le formulaire
                    // form.reset(); // Réinitialiser les valeurs du formulaire
                    // window.location.reload(); // Recharger la page pour afficher la nouvelle donnée
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
                    <Popover>
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
