import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { readDays } from "@/lib/actions/days-actions"
import { connectedUser } from "@/lib/actions/user-actions"
import { redirect } from "next/navigation"
import NavBar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import DailyTrack from "@/components/form/daily-track"
import SubmitSection from "@/components/shared/submitSection"
import StatCard from "@/components/shared/stat-card"
import { Progress } from "@/components/ui/progress"
import DaysTable from "@/components/shared/days-table"
import StatSection from "@/components/shared/stat-section"
import DaysList from "@/components/shared/days-list"

export default  async function Dashboard() {





const {data:days} = await readDays();
const {data:user, error} = await connectedUser();
if( !days || error || !user.user?.id){
  redirect('/auth')
}




  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">

        <Sidebar/>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        objectifs
      </div>
    </div>
  )
}


