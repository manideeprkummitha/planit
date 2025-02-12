// components/badges/StatusBadge.tsx
'use client';

import React from 'react';
import { Play, Pause, Square } from 'lucide-react';

type Status = 'started' | 'not_started' | 'on_hold';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'started':
      return (
        <div className="flex items-center gap-1 text-green-600">
          <Play className="size-4 hover:scale-110" />
        </div>
      );
    case 'not_started':
      return (
        <div className="flex items-center gap-1 text-red-600">
          <Square className="size-4 hover:scale-110" />
        </div>
      );
    case 'on_hold':
      return (
        <div className="flex items-center gap-1 text-yellow-600">
          <Pause className="size-4 hover:scale-110" />
        </div>
      );
    default:
      return null;
  }
};

export default StatusBadge;
