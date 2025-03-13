'use client';

import React from 'react';
import { Play, Pause, Square, CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { Hint } from '@/components/sub_components/hint/hint';

type Status = 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusData = {
    not_started: { label: 'Not Started', icon: <Square className="size-4" />, color: 'text-red-600' }, // Red
    on_hold: { label: 'On Hold', icon: <Pause className="size-4" />, color: 'text-orange-500' }, // Orange
    in_progress: { label: 'In Progress', icon: <Play className="size-4" />, color: 'text-blue-600' }, // Blue
    completed: { label: 'Completed', icon: <CheckCircle className="size-4" />, color: 'text-green-600' }, // Green
    cancelled: { label: 'Cancelled', icon: <XCircle className="size-4" />, color: 'text-gray-500' }, // Gray
  };

  const statusInfo = statusData[status] || { label: 'Unknown', icon: <Hourglass className="size-4" />, color: 'text-gray-400' };

  return (
    <Hint label={statusInfo.label} side="top" align="center">
      <div className={`flex items-center gap-1 ${statusInfo.color}`}>
        {statusInfo.icon}
      </div>
    </Hint>
  );
};

export default StatusBadge;
