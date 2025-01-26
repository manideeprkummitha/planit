'use client';
import React from 'react';
import {
  LayoutGridIcon,
  ListTodo,
  Folder,
  ArrowRightLeft,
  Timer,
  ChartLine,
  AudioLines,
  IndianRupee,
  Users,
  Bell,
} from 'lucide-react';

import MenuItem from '../../sub_components/sidebar/minimized_menuitem'; // Import the MenuItem component

const MinimizedSidebar = () => {
  return (
    <div className="h-screen w-[70px] border-r bg-muted/40 sticky">
      <div className="flex flex-col gap-2 h-full">
        {/* LOGO */}
        <div className="flex items-center justify-center px-4 py-3 w-full lg:h-[65px] border-b">
          <span className="text-xl font-semibold">TF</span>
        </div>
        {/* MenuItems */}
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-md font-medium lg:px-4">
            <MenuItem
              href="/home"
              icon={<LayoutGridIcon className="h-6 w-6" />}
              title="Home"
            />
            <MenuItem
              href="/todays_tasks"
              icon={<ListTodo className="h-6 w-6" />}
              title="Today's Task"
            />
            <MenuItem
              href="/buckets"
              icon={<Folder className="h-6 w-6" />}
              title="Buckets"
            />
            <MenuItem
              href="/delegated_tasks"
              icon={<ArrowRightLeft className="h-6 w-6" />}
              title="Delegated Tasks"
            />
            <MenuItem
              href="/meetings"
              icon={<Users className="h-6 w-6" />}
              title="Meetings"
            />
            <MenuItem
              href="/notifications"
              icon={<Bell className="h-6 w-6" />}
              title="Notifications"
            />
            <MenuItem
              href="/pomodoro"
              icon={<Timer className="h-6 w-6" />}
              title="Pomodoro"
            />
            <MenuItem
              href="/reports_and_analytics"
              icon={<ChartLine className="h-6 w-6" />}
              title="Reports & Analytics"
            />
            <MenuItem
              href="/voice_notes"
              icon={<AudioLines className="h-6 w-6" />}
              title="Voice Notes"
            />
            <MenuItem
              href="/loans_and_repayments"
              icon={<IndianRupee className="h-6 w-6" />}
              title="Loans and Repayments"
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MinimizedSidebar;
