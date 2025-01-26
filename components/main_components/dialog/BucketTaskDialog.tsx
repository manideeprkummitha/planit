'use client';

import React, { useState } from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import DialogActions from '@/components/sub_components/dialog/DialogActions';
import TaskForm from '@/components/sub_components/forms/TaskForm'; // Import the TaskForm component

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (taskData: any) => void;
  mode: 'add' | 'edit' | 'view'; // Mode to determine form behavior
  taskData?: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    taskTime: string;
    delegatedTo: string;
    isMeeting: boolean;
    notifyMe: boolean;
    notes: string;
  }; // Optional task data for edit/view mode
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onOpenChange, onSubmit, mode, taskData }) => {
  const [formData, setFormData] = useState(taskData || {
    id: '',
    title: '',
    description: '',
    status: '',
    priority: '',
    taskTime: '',
    delegatedTo: '',
    isMeeting: false,
    notifyMe: false,
    notes: '',
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data); // Pass the data to the parent
    onOpenChange(false); // Close the dialog
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title={mode === 'add' ? 'Add Task' : mode === 'edit' ? 'Edit Task' : 'View Task'}
    //   footer={
    //     mode !== 'view' && (
    //       <DialogActions
    //         onCancel={() => onOpenChange(false)}
    //         onCreate={() => handleFormSubmit(formData)}
    //       />
    //     )
    //   }
    >
      <TaskForm
        mode={mode}
        taskData={formData}
        onSubmit={(data) => {
          setFormData(data); // Update form data state
          handleFormSubmit(data);
        }}
      />
    </DialogBase>
  );
};

export default TaskDialog;
