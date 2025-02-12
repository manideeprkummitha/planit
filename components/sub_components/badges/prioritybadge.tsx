// components/badges/PriorityBadge.tsx
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowBigUpDash, ArrowBigRightDash, ArrowBigDownDash } from 'lucide-react';

type Priority = 'high' | 'medium' | 'low';

interface PriorityBadgeProps {
  priority: Priority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  switch (priority) {
    case 'high':
      return (
        <Badge variant="outline" className="text-[12px] bg-red-500 gap-1 text-white">
          <ArrowBigUpDash className="size-4 hover:scale-125" /> High
        </Badge>
      );
    case 'medium':
      return (
        <Badge variant="outline" className="text-[12px] bg-orange-500 gap-1 text-white">
          <ArrowBigRightDash className="size-4 hover:scale-125" /> Medium
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="text-[12px] bg-green-500 gap-1 text-white">
          <ArrowBigDownDash className="size-4 hover:scale-125" /> Low
        </Badge>
      );
    default:
      return null;
  }
};

export default PriorityBadge;
