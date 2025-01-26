'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
interface BucketsTaskSummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    status?: string;
    priority?: string;
    delegatedTask?: string;
    taskTime?: string;
    notes?: string;
    isRecurring?: boolean; // New field for recurring
  };
}

const BucketsTaskSummaryDialog: React.FC<BucketsTaskSummaryDialogProps> = ({
  isOpen,
  onClose,
  task: taskData,
}) => {
  if (!taskData) {
    return null; // Prevent rendering if taskData is not available
  }

  const generateTaskSummary = () => {
    const {
      title = "Unknown Task",
      status = "Unknown Status",
      priority = "Unknown Priority",
      delegatedTask = "No Assignee",
      taskTime = "No Time",
      notes = "No Notes",
      isRecurring = false,
    } = taskData;

    let summary = `The task "${title}" is currently "${status}" with a priority of "${priority}". `;
    summary += `It is assigned to "${delegatedTask}" and scheduled for "${taskTime}". `;
    summary += isRecurring ? "This is a recurring task. " : "This is not a recurring task. ";
    summary += `Additional notes: "${notes}"`;

    return summary;
  };

  const taskSummary = generateTaskSummary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Task Summary</DialogTitle>
          <DialogDescription className='text-md'>{taskSummary}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onClose(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BucketsTaskSummaryDialog;
