'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PRIORITY_LEVELS, TASK_TYPES, STATUSES } from '@/utils/constants';

interface BucketFormProps {
  mode: 'add' | 'edit' | 'view'; // Add modes
  bucketName: string;
  bucketDescription: string;
  bucketPriority: string; // Field for the selected priority
  bucketType: string; // Field for the selected task type
  bucketStatus: string; // Field for the selected status
  bucketTag: string;
  setBucketName: (name: string) => void;
  setBucketDescription: (description: string) => void;
  setBucketPriority: (priority: string) => void; // Function to update priority
  setBucketType: (type: string) => void; // Function to update task type
  setBucketStatus: (status: string) => void; // Function to update status
  setBucketTag: (tag: string) => void;
}

const BucketForm: React.FC<BucketFormProps> = ({
  mode,
  bucketName,
  bucketDescription,
  bucketPriority,
  bucketType,
  bucketStatus,
  bucketTag,
  setBucketName,
  setBucketDescription,
  setBucketPriority,
  setBucketType,
  setBucketStatus,
  setBucketTag,
}) => {
  const isViewMode = mode === 'view'; // Determine if it's view mode

  return (
    <div className="space-y-4 custom-scrollbar">
      {/* Bucket Name Input */}
      <Input
        placeholder="Bucket Name"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        className="border-b-1"
        disabled={isViewMode} // Disable input in view mode
      />

      {/* Bucket Description Input */}
      <Textarea
        placeholder="Bucket Description"
        value={bucketDescription}
        onChange={(e) => setBucketDescription(e.target.value)}
        className="border-b-1"
        disabled={isViewMode} // Disable input in view mode
      />

      {/* Bucket Priority Dropdown */}
      <div className="flex items-center gap-4 justify-start px-2">
        <p className="text-sm">Bucket Priority</p>
        <div>
          <Select
            value={bucketPriority}
            onValueChange={(value) => setBucketPriority(value)}
            disabled={isViewMode} // Disable dropdown in view mode
          >
            <SelectTrigger className="w-[250px] border-b-1">
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
      </div>

      {/* Bucket Type Dropdown */}
      <div className="flex items-center gap-7 justify-start px-2">
        <p className="text-sm">Bucket Type</p>
        <div>
          <Select
            value={bucketType}
            onValueChange={(value) => setBucketType(value)}
            disabled={isViewMode} // Disable dropdown in view mode
          >
            <SelectTrigger className="w-[250px] border-b-1">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              <SelectGroup>
                <SelectLabel>Task Types</SelectLabel>
                {TASK_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bucket Status Dropdown */}
      <div className="flex items-center gap-5 justify-start px-2">
        <p className="text-sm">Bucket Status</p>
        <div>
          <Select
            value={bucketStatus}
            onValueChange={(value) => setBucketStatus(value)}
            disabled={isViewMode} // Disable dropdown in view mode
          >
            <SelectTrigger className="w-[250px] border-b-1">
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
      </div>

      {/* Bucket Tags */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm">Bucket Tags</p>
        <div className="w-[252px]">
          <Input
            placeholder="Enter a Bucket Tag"
            value={bucketTag}
            onChange={(e) => setBucketTag(e.target.value)}
            className="border-b-1"
            disabled={isViewMode} // Disable input in view mode
          />
        </div>
      </div>
    </div>
  );
};

export default BucketForm;
