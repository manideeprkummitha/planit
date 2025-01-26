"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Sun, CircleCheck, CalendarIcon, Users, Pencil, Ellipsis } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { columns } from "@/components/table_components/columns";
import { DataTable } from "@/components/table_components/data-table";
import { taskSchema } from "@/lib/schema";

import { STATUSES, PRIORITY_LEVELS } from "@/utils/constants";
import { z } from "zod";
import EditBucketDialog from "@/components/main_components/dialog/EditBucketDialog";

// Replace the fs and path usage with a static import or API fetch
// For this example, we'll assume tasks are static JSON data
import tasksData from "@/lib/tasks.json";

export default function Page() {
  const [bucketStatus, setBucketStatus] = useState("");
  const [bucketPriority, setBucketPriority] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, quas ex reiciendis cumque laudantium obcaecati perspiciatis, soluta possimus enim sapiente eaque deleniti impedit facilis consequatur repellat laboriosam ut magnam quaerat."
  );

  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state
  const dropdownRef = useRef<HTMLDivElement>(null);
  // State to show/hide the edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    // Validate and set the tasks using zod schema
    const loadTasks = async () => {
      try {
        const validatedTasks = z.array(taskSchema).parse(tasksData);
        setTasks(validatedTasks);
      } catch (error) {
        console.error("Error validating tasks:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      status: bucketStatus,
      priority: bucketPriority,
      dueDate: date,
      description,
    });
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  // Generate bucket summary data
  const totalTasks = tasks.length;
  const tasksByPriority = PRIORITY_LEVELS.map((priority) => ({
    label: priority.label,
    count: tasks.filter((task) => task.priority === priority.value).length,
  }));
  const tasksByStatus = STATUSES.map((status) => ({
    label: status.label,
    count: tasks.filter((task) => task.status === status.value).length,
  }));

  return (
    <div className="p-4 flex flex-col items-center justify-start w-full">
      {/* Bucket Details Section */}
      <div className="w-full flex items-center justify-between">
        {/* Bucket Details and Bucket Summary Section */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Bucket Details Section */}
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-semibold mb-4">Design Homepage Wireframe</h1>
              <div className="relative">
                <Ellipsis
                  className="size-5 cursor-pointer mb-2 hover:scale-90"
                  onClick={() => setShowDropdown((prev) => !prev)}
                />
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-8 bg-white shadow-md border rounded-md z-50 w-24"
                  >
                    <div
                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-4 w-full">
              {/* Created Time */}
              <div className="flex items-center justify-between w-full max-w-[600px]">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>Created Time</span>
                </div>
                <span>September 20, 2024</span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between w-full max-w-[600px]">
                <div className="flex items-center gap-2">
                  <Sun size={20} />
                  <span>Status</span>
                </div>
                <Select
                  value={bucketStatus}
                  onValueChange={(value) => setBucketStatus(value)}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status Options</SelectLabel>
                      {STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between w-full max-w-[600px]">
                <div className="flex items-center gap-2">
                  <CircleCheck size={20} />
                  <span>Priority</span>
                </div>
                <Select
                  value={bucketPriority}
                  onValueChange={(value) => setBucketPriority(value)}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority Levels</SelectLabel>
                      {PRIORITY_LEVELS.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="flex items-center justify-between w-full max-w-[600px]">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={20} />
                  <span>Due Date</span>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[250px] text-left">
                      {date ? date.toDateString() : "Select a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Bucket Description */}
            <div className="mt-4 w-full max-w-[600px] bg-gray-100 rounded-md p-4">
              <div className="w-full items-center justify-between flex">
                <h2 className="font-semibold text-lg mb-2">Bucket Description</h2>
              </div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-none shadow-none"
                placeholder="Edit bucket description..."
              />
            </div>
          </div>

          {/* Bucket Summary Section */}
          {/* <div className="flex flex-col items-start justify-start w-full px-4">
  <h1 className="text-3xl font-semibold mb-4">Bucket Summary</h1>
  
  <div className="w-full mb-4">
    <h2 className="text-lg font-medium text-gray-700">Total Tasks</h2>
    <p className="text-2xl font-bold text-green-600">{totalTasks}</p>
  </div>

  <div className="w-full mb-6">
    <h2 className="text-lg font-medium text-gray-700">Tasks by Priority</h2>
    <div className="space-y-2">
      {tasksByPriority.map(({ label, count }) => (
        <div key={label} className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <div className="flex-1 mx-4 bg-gray-200 rounded-md h-3">
            <div
              className="bg-blue-500 h-3 rounded-md"
              style={{ width: `${(count / totalTasks) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-800">{count}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="w-full">
    <h2 className="text-lg font-medium text-gray-700">Tasks by Status</h2>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {tasksByStatus.map(({ label, count }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <span className="text-lg font-semibold text-gray-700">{count}</span>
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="w-full mt-6">
    <h2 className="text-lg font-medium text-gray-700">Recurring Tasks</h2>
    <div className="flex items-center justify-between mt-2">
      <p className="text-sm text-gray-600">
        {tasks.filter((task) => task.isRecurring).length} out of {totalTasks} tasks are recurring.
      </p>
      <div className="bg-purple-200 rounded-md px-2 py-1">
        <span className="text-sm text-purple-600 font-semibold">
          {`${Math.round(
            (tasks.filter((task) => task.isRecurring).length / totalTasks) * 100
          )}%`}
        </span>
      </div>
    </div>
  </div>
</div> */}

        </div>
      </div>

      {/* Bucket Table */}
      <div className="flex w-full mt-10">
        {tasks.length > 0 ? (
          <div className="w-full max-w-full">
            <DataTable data={tasks} columns={columns} />
          </div>
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>

      {/* Edit Bucket Dialog */}
      {showEditDialog && (
        <EditBucketDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onCreate={(bucketName, bucketDescription) =>
            console.log(`Bucket Created: ${bucketName}, ${bucketDescription}`)
          }
        />
      )}
    </div>
  );
}
