import { Label } from "@radix-ui/react-dropdown-menu";

// Priority Levels
export const PRIORITY_LEVELS = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];
  
  // Task Types
  export const TASK_TYPES = [
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Health', value: 'health' },
    { label: 'Learning', value: 'learning' },
    { label: 'Finance', value: 'finance' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Errands', value: 'errands' },
    { label: 'Events', value: 'events' },
    { label: 'Household', value: 'household' },
    { label: 'Social', value: 'social' },
    { label: 'Goals', value: 'goals' },
    { label: 'Miscellaneous', value: 'miscellaneous' },
  ];
  
  // Task/Bucket Statuses
export const STATUSES = [
  { label: 'Not Started', value: 'not_started' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Started', value: 'Not Started' },
  {Label:"Completed", value:"Completed"},
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Cancelled', value: 'cancelled' },
];


export const TASK_RECURRING_TIME_FREQUENCY = [
  "Daily",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Quarterly",
  "Half-Yearly",
  "Yearly",
  "Custom"
];
