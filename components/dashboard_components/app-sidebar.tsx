"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  // PieChart,
  SquareTerminal,
  HomeIcon,
  Building2Icon,
  NotebookIcon,
  Timer,
  Bell,
  // Boxes,
} from "lucide-react"

import { NavMain } from "@/components/dashboard_components/nav-main"
// import { NavProjects } from "@/components/dashboard_components/nav-projects"
import { NavUser } from "@/components/dashboard_components/nav-user"
import { TeamSwitcher } from "@/components/dashboard_components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Plan It",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: HomeIcon,
      isActive: false,
    },
    {
      title: "Buckets",
      url: "/buckets",
      icon: SquareTerminal,
      isActive: false,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: Bot,
      isActive:true,
      // items: [
      //   {
      //     title: "Todays Task",
      //     url: "/todays-tasks",
      //   },
      //   {
      //     title: "Delegated Tasks",
      //     url: "#",
      //   },
      //   {
      //     title: "Meetings",
      //     url: "#",
      //   },
      //   {
      //     title: "Next 7 days",
      //     url: "/next-7-days",
      //   },
      //   {
      //     title:"This Month",
      //     url:"/this-month-tasks",
      //   }
      // ],
    },
    // {
    //     title: "Employees",
    //     url: "#",
    //     icon: Boxes,
    //     isActive: true,
    //     items: [
    //         {
    //             title: "All Companies",
    //             url: "#",
    //         },
    //         {
    //           title: "Projects",
    //           url: "#",
    //         },
    //         {
    //           title: "Finances",
    //           url: "#",
    //         },
    //         {
    //           title: "Loans & Repayments",
    //           url: "#",
    //         },
    //         {
    //           title: "Employees Details",
    //           url: "#",
    //         },
    //         {
    //             title:"GST Filling",
    //             url:"#",
    //         },
    //         {
    //             title:"Company Expenses",
    //             url:"#",
    //         },
    //         {
    //             title:"Company Important Reminders",
    //             url:"#",
    //         },
    //         {
    //             title:"Sales and Marketing",
    //             url:"#",
    //         }
    //       ],
    //   },
    // {
    //   title: "Company",
    //   url: "#",
    //   icon: Building2Icon,
    //   isActive: true,
    //   items: [
    //     {
    //         title: "All Companies",
    //         url: "#",
    //     },
    //     {
    //       title: "Projects",
    //       url: "#",
    //     },
    //     {
    //       title: "Finances",
    //       url: "#",
    //     },
    //     {
    //       title: "Loans & Repayments",
    //       url: "#",
    //     },
    //     {
    //       title: "Employees Details",
    //       url: "#",
    //     },
    //     {
    //         title:"GST Filling",
    //         url:"#",
    //     },
    //     {
    //         title:"Company Expenses",
    //         url:"#",
    //     },
    //     {
    //         title:"Company Important Reminders",
    //         url:"#",
    //     },
    //     {
    //         title:"Sales and Marketing",
    //         url:"#",
    //     }
    //   ],
    // },
    {
      title: "Notes",
      url: "/notes",
      icon: NotebookIcon,
      isActive: true,
      // items: [
      //   {
      //     title: "Text Notes",
      //     url: "#",
      //   },
      //   {
      //     title: "Voice Notes",
      //     url: "#",
      //   },
      // ],
    },
   
    // {
    //     title: "Reports and Analytics",
    //     url: "#",
    //     icon: Bot,
    //     isActive: true,
    //     items: [
    //       {
    //         title: "Recurring Tasks",
    //         url: "#",
    //       },
    //       {
    //         title: "Daily Summary",
    //         url: "#",
    //       },
    //       {
    //         title: "Weekly Trends",
    //         url: "#",
    //       },
    //     ],
    //   },
    {
        title:"Notifications",
        url:"/notifications",
        icon:Bell,
        isActive:false
    },
    {
      title: "Pomodoro",
      url: "/pomodoro",
      icon: Timer,
      isActive: false,
    },
  ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
