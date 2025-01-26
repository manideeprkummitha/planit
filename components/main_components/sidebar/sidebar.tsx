'use client'
import React from 'react';

import { 
        LayoutGridIcon, ListTodo, Folder, 
        ArrowRightLeft, Timer, ChartLine, 
        AudioLines, IndianRupee, Users,
        Bell,
       } 
from 'lucide-react';

import MenuItem from '../../sub_components/sidebar/menuItem'; // Import the MenuItem component

const Sidebar = () => {
  return (
    <div className='hidden h-screen border-r bg-muted/40 md:block w-[300px] sticky'>
      <div className='flex flex-col sticky gap-2 h-full'>
        {/* LOGO component + chevronLeft */}
        <div className='flex items-center justify-start px-6 py-3 w-full lg:h-[65px] border-b'>
            <span className='text-2xl font-semibold text-start'>Task Funnel</span>
        </div>
        {/* MenuItems */}
        <div className='flex-1 overflow-y-auto'>
          <nav className='grid items-start px-2 text-md font-medium lg:px-4'>
            <MenuItem href='/home' icon={<LayoutGridIcon className='size-5' />} title='Home' />
            <MenuItem href='/todays_tasks' icon={<ListTodo className='size-5'/>} title='Todays Task' />
            <MenuItem href='/buckets' icon={<Folder className='size-5'/>} title='Buckets' />
            <MenuItem href='/delegated_tasks' icon={<ArrowRightLeft className='size-5'/>} title='Delagated Tasks' />
            <MenuItem href="/meetings" icon={<Users className='size-5'/>} title='Meetings' />
            <MenuItem href="/notifications" icon={<Bell className='size-5'/>} title='Notifications' />
            <MenuItem href='/pomodoro' icon={<Timer className='size-5'/>} title='Pomodoro' />
            <MenuItem href='/reports_and_analytics' icon={<ChartLine className='size-5'/>} title='Reports & Analytics' />
            <MenuItem href='/voice_notes' icon={<AudioLines className='size-5'/>} title='Voice Notes' />
            <MenuItem href='/loans_and_repayments' icon={<IndianRupee className='size-5'/>} title='Loans and Repayments' />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
