"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client"; // Auth0 user session

import DialogBase from "@/components/sub_components/dialog/DialogBase";
import DialogActions from "@/components/sub_components/dialog/DialogActions";
import TaskForm from "@/components/sub_components/forms/TaskForm";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bucketId?: string; // Received from toolbar
  mode: "add" | "edit" | "view"; // Determines the dialog mode
  taskData?: {
    id: string;
    task_title: string;
    task_description: string;
    task_status: string;
    task_priority: string;
    task_due_date: string;
    task_delegated_to: string;
    task_meeting: boolean;
    task_notify: boolean;
    task_notes: string;
  }; // Optional task data for edit/view mode
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onOpenChange, bucketId, mode, taskData }) => {
  const { user } = useUser(); // Get user session
  const [formData, setFormData] = useState({
    id: "",
    task_title: "",
    task_description: "",
    task_status: "",
    task_priority: "",
    task_due_date: "",
    task_delegated_to: "",
    task_meeting: false,
    task_notify: false,
    task_notes: "",
  });

  useEffect(() => {
    if (taskData) {
      setFormData(taskData);
    } else if (mode === "add") {
      setFormData({
        id: "",
        task_title: "",
        task_description: "",
        task_status: "",
        task_priority: "",
        task_due_date: "",
        task_delegated_to: "",
        task_meeting: false,
        task_notify: false,
        task_notes: "",
      });
    }
  }, [taskData, mode]);

  const handleFormSubmit = async () => {
    console.log("Submitting Task:", formData);

    if (!formData.task_title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (!bucketId) {
      alert("Bucket ID is missing. Please select a valid bucket.");
      return;
    }

    try {
      const bodyToSend = {
        owner_user_id: user?.sub,
        bucket_id: bucketId, // Bucket ID passed correctly
        task_title: formData.task_title,
        task_description: formData.task_description,
        task_status: formData.task_status,
        task_priority: formData.task_priority,
        task_due_date: formData.task_due_date, // Standardized field name
        task_delegated_to: formData.task_delegated_to,
        task_meeting: formData.task_meeting,
        task_notify: formData.task_notify,
        task_notes: formData.task_notes,
      };

      console.log("POST /api/tasks: Sending request with body:", bodyToSend);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task. Status: ${response.status}`);
      }

      const createdTask = await response.json();
      console.log("Task created successfully:", createdTask);

      // Clear form after successful submission
      setFormData({
        id: "",
        task_title: "",
        task_description: "",
        task_status: "",
        task_priority: "",
        task_due_date: "",
        task_delegated_to: "",
        task_meeting: false,
        task_notify: false,
        task_notes: "",
      });

      onOpenChange(false); // Close dialog on success
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "add" ? "Add Task" : mode === "edit" ? "Edit Task" : "View Task"}
      footer={
        mode !== "view" && (
          <DialogActions
            buttons={[
              {
                text: "Cancel",
                color: "bg-red-600 hover:bg-red-700 text-white",
                onClick: () => onOpenChange(false),
              },
              {
                text: mode === "add" ? "Create" : "Save",
                color: "bg-blue-600 hover:bg-blue-700 text-white",
                onClick: handleFormSubmit,
              },
            ]}
          />
        )
      }
    >
      <TaskForm
        mode={mode}
        bucket_id={bucketId || ""}
        taskData={formData}
        onChange={(key, value) => setFormData((prev) => ({ ...prev, [key]: value }))}
      />
    </DialogBase>
  );
};

export default TaskDialog;
