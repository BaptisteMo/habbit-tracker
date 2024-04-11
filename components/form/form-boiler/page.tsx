"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"
import supabaseBrowser from "@/lib/supabase/browser"
import useUser from "../../../app/hook/useUser"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


type formType = z.infer<typeof formSchema>;


export default function ProfileForm() {
    const { toast } = useToast()

    const {data} = useUser();

        // 1. Define your form.
        const form = useForm<formType>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            username: "",
          },
        })

        async function onSubmit(values: formType) {
            const supabase = supabaseBrowser()
            const {error} = await supabase.from('test_table').insert({
                text : values.username,
                userID: data?.id
            })

            toast({
                description: "Formulaire envoyé",
              })
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)

          }

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
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
