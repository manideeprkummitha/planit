// components/badges/TypeBadge.tsx
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TASK_TYPES } from '@/utils/constants';
import {
  Briefcase,
  User,
  Heart,
  Book,
  DollarSign,
  ShoppingCart,
  ClipboardList,
  Calendar,
  Home,
  Users,
  Target,
  MoreHorizontal
} from 'lucide-react'; // Import relevant icons

interface TypeBadgeProps {
  type: string;
  className?: string;
}

const typeColorMap: { [key: string]: string } = {
  work: "bg-blue-500 border-blue-500 text-white",
  personal: "bg-green-500 border-green-500 text-white",
  health: "bg-red-500 border-red-500 text-white",
  learning: "bg-yellow-500 border-yellow-500 text-white",
  finance: "bg-purple-500 border-purple-500 text-white",
  shopping: "bg-orange-500 border-orange-500 text-white",
  errands: "bg-pink-500 border-pink-500 text-white",
  events: "bg-indigo-500 border-indigo-500 text-white",
  household: "bg-teal-500 border-teal-500 text-white",
  social: "bg-cyan-500 border-cyan-500 text-white",
  goals: "bg-lime-500 border-lime-500 text-white",
  miscellaneous: "bg-gray-500 border-gray-500 text-white",
};

// Map icons to each type
const typeIconMap: { [key: string]: React.ReactNode } = {
  work: <Briefcase className="h-3 w-3" />,
  personal: <User className="h-3 w-3" />,
  health: <Heart className="h-3 w-3" />,
  learning: <Book className="h-3 w-3" />,
  finance: <DollarSign className="h-3 w-3" />,
  shopping: <ShoppingCart className="h-3 w-3" />,
  errands: <ClipboardList className="h-3 w-3" />,
  events: <Calendar className="h-3 w-3" />,
  household: <Home className="h-3 w-3" />,
  social: <Users className="h-3 w-3" />,
  goals: <Target className="h-3 w-3" />,
  miscellaneous: <MoreHorizontal className="h-3 w-3" />, // Default icon
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, className }) => {
  const foundType = TASK_TYPES.find((t) => t.value === type);
  const label = foundType ? foundType.label : type;

  const typeStyles = typeColorMap[type] || "bg-gray-200 border-gray-200 text-gray-800";
  const icon = typeIconMap[type] || <MoreHorizontal className="h-3 w-3" />; // Default icon if type not found

  const defaultClasses = "text-[12px] gap-1 p-1 flex items-center"; // Added flex for alignment

  return (
    <Badge variant="outline" className={`${defaultClasses} ${typeStyles} ${className || ''}`}>
      {icon}
      {label}
    </Badge>
  );
};

export default TypeBadge;
