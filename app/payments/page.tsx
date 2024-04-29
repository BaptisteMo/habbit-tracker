import { readDays } from "@/lib/actions/days-actions";
import {Day, columns } from "./columns"
import { DataTable } from "./data-table"
import { redirect } from "next/navigation";
import { connectedUser } from "@/lib/actions/user-actions";

async function getData(): Promise<Day[]> {
  // Fetch data from your API here.

  const {data:days} = await readDays();
  if(!days){
    redirect('/auth')
  }
  return days
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="">
      <DataTable columns={columns} data={data} />

    </div>
  )
}
