import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { connectedUser } from "@/lib/actions/user-actions"
import { redirect } from "next/navigation"
import Sidebar from "@/components/shared/sidebar"
import { readDays } from "@/lib/actions/days-actions"
import DailyTrack from "@/components/form/daily-track"
import WeightTrack from "@/components/form/weight-track"
import { readWeight } from "@/lib/actions/weight-actions"

export default  async function Dashboard() {




  const {data:days} = await readDays();
  const {data:weight} = await readWeight();

const {data:user, error} = await connectedUser();
if(!weight || !days || error || !user.user?.id){
  redirect('/auth')
}



  return (
    <div className="flex items-center justify-center min-h-screen w-full flex-col bg-muted/40">

        <Sidebar 
          userConnectedID={user.user.id}
        />
        <Tabs defaultValue="account" className="w-1/3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Les journées</TabsTrigger>
            <TabsTrigger value="password">Le poids</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Daily track</CardTitle>
                <CardDescription>
                 Enregistre de tes journées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <DailyTrack
                  userConnectedID= {user.user.id}
                  daysInfos = {days}
                />
              </CardContent>

            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle mesure de poid</CardTitle>
                <CardDescription>
                  Définir un nouveau poid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <WeightTrack
                  userConnectedID= {user.user.id}
                  weightInfos = {weight}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  )
}


