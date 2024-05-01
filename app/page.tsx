
import { readDays } from "@/lib/actions/days-actions"
import { connectedUser } from "@/lib/actions/user-actions"
import { redirect } from "next/navigation"
import Sidebar from "@/components/shared/sidebar"
import StatSection from "@/components/shared/stat-section"
import { columns } from "./payments/columns"
import { DataTable } from "./payments/data-table"
import { LastFiveWeight, readWeight } from "@/lib/actions/weight-actions"
import PhoneCardDay from "@/components/shared/phone/card-list-days"
import BottomBar from "@/components/shared/phone/bottom-bar"
import PwaButton from "@/components/shared/pwa-button"




export default  async function Dashboard() {


  const {data:weight} = await readWeight();
  const {data:user, error} = await connectedUser();
  const {data:chartweight} = await LastFiveWeight();
  
  const {data:days} = await readDays();
  if(!chartweight ||!weight || !days || error || !user.user?.id){
    redirect('/auth')
  }

// const data = await getData()




  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pl-0 pb-24 sm:pl-[200px]">

        <Sidebar 
          userConnectedID={user.user.id}
          WeightInfos ={weight}
          DayInfos= {days}
        />
        <BottomBar
            userConnectedID={user.user.id}
            WeightInfos ={weight}
            DayInfos= {days}
        />

      <div className="flex py-4 flex-col sm:gap-4 ">

              <StatSection daysInfos={days} weightForChart={chartweight} />
              <PhoneCardDay daysInfos={days} />

              {/* <DaysTable daysTable={days} /> */}
              <DataTable columns={columns} data={days} />



      </div>
    </div>
  )
}


