"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES, PRIORITY_LEVELS } from "@/utils/constants";

interface TaskFormProps {
  mode: "add" | "edit" | "view";
  bucket_id: string; // Bucket ID from parent
  taskData: {
    id: string;
    task_title: string;
    task_description: string;
    task_status: string;
    task_priority: string;
    task_due_date: string; // Includes both date & time
    task_delegated_to: string;
    task_meeting: boolean;
    task_notify: boolean;
    task_notes: string; // Additional notes
  };
  onChange: (key: string, value: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, taskData, onChange }) => {
  const isViewMode = mode === "view";

  return (
    <div className="flex flex-col gap-4 p-1 w-full max-h-80 max-w-md overflow-y-auto custom-scrollbar">
      {/* Task Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Title</label>
        <Input
          value={taskData.task_title}
          onChange={(e) => onChange("task_title", e.target.value)}
          placeholder="Enter task title"
          disabled={isViewMode}
          required
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Description</label>
        <Textarea
          value={taskData.task_description}
          onChange={(e) => onChange("task_description", e.target.value)}
          placeholder="Enter task description"
          disabled={isViewMode}
          className="w-full"
        />
      </div>

      {/* Task Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Status</label>
        <Select
          value={taskData.task_status}
          onValueChange={(value) => onChange("task_status", value)}
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

      {/* Task Priority */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Priority</label>
        <Select
          value={taskData.task_priority}
          onValueChange={(value) => onChange("task_priority", value)}
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

      {/* Task Due Date (Date & Time) */}
      <div>
        <label className="block text-sm font-medium mb-1">Due Date & Time</label>
        <Input
          type="datetime-local"
          value={taskData.task_due_date}
          onChange={(e) => onChange("task_due_date", e.target.value)}
          placeholder="Select due date & time"
          disabled={isViewMode}
          required
        />
      </div>

      {/* Task Delegated To */}
      <div>
        <label className="block text-sm font-medium mb-1">Delegated To</label>
        <Input
          value={taskData.task_delegated_to}
          onChange={(e) => onChange("task_delegated_to", e.target.value)}
          placeholder="Enter assignee name"
          disabled={isViewMode}
        />
      </div>

      {/* Task Meeting */}
      <div className="flex items-center gap-4 justify-between w-full">
        <label className="text-sm font-medium">Is it a Meeting?</label>
        <Switch
          checked={taskData.task_meeting}
          onCheckedChange={(value) => onChange("task_meeting", value)}
          disabled={isViewMode}
        />
      </div>

      {/* Task Notify */}
      <div className="flex items-center gap-4 justify-between w-full">
        <label className="text-sm font-medium">Notify Me</label>
        <Switch
          checked={taskData.task_notify}
          onCheckedChange={(value) => onChange("task_notify", value)}
          disabled={isViewMode}
        />
      </div>

      {/* Task Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea
          value={taskData.task_notes}
          onChange={(e) => onChange("task_notes", e.target.value)}
          placeholder="Enter additional notes"
          disabled={isViewMode}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TaskForm;
