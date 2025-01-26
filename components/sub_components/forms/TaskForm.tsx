'use client';

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { STATUSES, PRIORITY_LEVELS } from '@/utils/constants';

interface TaskFormProps {
  mode: 'add' | 'edit' | 'view';
  taskData?: {
    id: string;
    title: string;
    status: string;
    priority: string;
    taskTime: string;
    delegatedTo: string;
    isMeeting: boolean;
    notifyMe: boolean;
    notes: string;
  };
  onSubmit: (data: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, taskData, onSubmit }) => {
  const [title, setTitle] = useState(taskData?.title || '');
  const [status, setStatus] = useState(taskData?.status || '');
  const [priority, setPriority] = useState(taskData?.priority || '');
  const [taskTime, setTaskTime] = useState(taskData?.taskTime || '');
  const [delegatedTo, setDelegatedTo] = useState(taskData?.delegatedTo || '');
  const [isMeeting, setIsMeeting] = useState(taskData?.isMeeting || false);
  const [notifyMe, setNotifyMe] = useState(taskData?.notifyMe || false);
  const [notes, setNotes] = useState(taskData?.notes || '');

  const isViewMode = mode === 'view';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewMode) return; // Do nothing in view mode
    onSubmit({
      title,
      status,
      priority,
      taskTime,
      delegatedTo,
      isMeeting,
      notifyMe,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 w-full max-h-80 max-w-md overflow-y-auto custom-scrollbar">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          disabled={isViewMode}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value)}
          disabled={isViewMode}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <Select
          value={priority}
          onValueChange={(value) => setPriority(value)}
          disabled={isViewMode}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITY_LEVELS.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Task Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Time</label>
        <Input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          placeholder="Enter task time"
          disabled={isViewMode}
          required
        />
      </div>

      {/* Delegated To */}
      <div>
        <label className="block text-sm font-medium mb-1">Delegated To</label>
        <Input
          value={delegatedTo}
          onChange={(e) => setDelegatedTo(e.target.value)}
          placeholder="Enter assignee name"
          disabled={isViewMode}
          required
        />
      </div>

      {/* Is Meeting */}
      <div className="flex items-center gap-4 justify-between w-full">
        <label className="text-sm font-medium">Is it a Meeting?</label>
        <Switch
          checked={isMeeting}
          onCheckedChange={(value) => setIsMeeting(value)}
          disabled={isViewMode}
        />
      </div>

      {/* Notify Me */}
      <div className="flex items-center gap-4 justify-between w-full">
        <label className="text-sm font-medium">Notify Me</label>
        <Switch
          checked={notifyMe}
          onCheckedChange={(value) => setNotifyMe(value)}
          disabled={isViewMode}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes"
          disabled={isViewMode}
          className="w-full"
        />
      </div>

      {/* Submit Button */}
      {mode !== 'view' && (
        <Button type="submit" className="w-full">
          {mode === 'add' ? 'Add Task' : 'Update Task'}
        </Button>
      )}
    </form>
  );
};

export default TaskForm;
