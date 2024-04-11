"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { repos, repas, sommeil, training, eau } from "@/lib/constant"
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"
import supabaseBrowser from "@/lib/supabase/browser"
import useUser from "../../app/hook/useUser"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { dailTrackerSchema, typeDailyTracker } from "@/lib/schemas/dailyTracker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function DailyTrack() {

    const { toast } = useToast()

    const {data} = useUser();

    

        // 1. Define your form.
        const form = useForm<typeDailyTracker>({
          resolver: zodResolver(dailTrackerSchema),
          defaultValues :{
            repos:"marche",
            training:"aucun",
            sommeil:"moyen",
            eau:"peu",
            repas_matin:"aucun",
            repas_midi:"incomplet",
            repas_soir:"incomplet",
          }
        })

        async function onSubmit(values: typeDailyTracker) {


            const scoreRepos = repos.find(item => item.value === values["repos"])?.score ?? 0;
            const scoreTraining = training.find(item => item.value === values["training"])?.score ?? 0;
            const scoreSommeil = sommeil.find(item => item.value === values["sommeil"])?.score ?? 0;
            const scoreEau = eau.find(item => item.value === values["eau"])?.score ?? 0;
            const scoreRepasMatin = repas.find(item => item.value === values["repas_matin"])?.score ?? 0;
            const scoreRepasMidi = repas.find(item => item.value === values["repas_midi"])?.score ?? 0;
            const scoreRepasSoir = repas.find(item => item.value === values["repas_soir"])?.score ?? 0;

            const totalScore = scoreRepos + scoreTraining + scoreSommeil + scoreEau + scoreRepasMatin + scoreRepasMidi + scoreRepasSoir;
        
            console.log("Score:", totalScore);

            console.log(values)

            const supabase = supabaseBrowser()
            const {error} = await supabase.from('days').insert({
                repos: values.repos,
                training: values.training,
                sommeil: values.sommeil,
                eau: values.eau,
                repas_matin: values.repas_matin,
                repas_midi: values.repas_midi,
                repas_soir: values.repas_soir,

                score_repos: scoreRepos,
                score_training: scoreTraining,
                score_sommeil: scoreSommeil,
                score_eau: scoreEau,
                score_matin: scoreRepasMatin,
                score_midi: scoreRepasMidi,
                score_soir: scoreRepasSoir,
                total_day: totalScore,


                userID: data?.id
            })

            toast({
                description: "Formulaire envoyé",
              })
            // Do something with the form values.
            // ✅ This will be type-safe and validated.

        }
  return (
    <div>
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
            control={form.control}
            name="repos"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {repos.map((item,index)=>(
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

                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Toaster />

    </div>
  )
}
