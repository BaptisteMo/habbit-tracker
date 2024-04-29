
import { readDays } from "@/lib/actions/days-actions"
import { connectedUser } from "@/lib/actions/user-actions"
import { redirect } from "next/navigation"
import Sidebar from "@/components/shared/sidebar"
import StatSection from "@/components/shared/stat-section"
import { columns } from "./payments/columns"
import { DataTable } from "./payments/data-table"
import { LastFiveWeight, readWeight } from "@/lib/actions/weight-actions"




export default  async function Dashboard() {


  const {data:weight} = await readWeight();
  const {data:user, error} = await connectedUser();
  const {data:chartweight} = await LastFiveWeight();
  
  if(!chartweight ||!weight || error || !user.user?.id){
    redirect('/auth')
  }
  const {data:days} = await readDays(user.user.id);
  if(!days ){
    redirect('/auth')
  }
// const data = await getData()




  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pl-[200px]">

        <Sidebar 
          userConnectedID={user.user.id}
          WeightInfos ={weight}
          DayInfos= {days}
        />

      <div className="flex py-4 flex-col sm:gap-4">
              <StatSection daysInfos={days} weightForChart={chartweight} />

              {/* <DaysTable daysTable={days} /> */}
              <DataTable columns={columns} data={days} />



      </div>
    </div>
  )
}


