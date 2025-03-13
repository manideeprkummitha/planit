'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Ellipsis, Edit, Trash, Paperclip, MessageSquare } from 'lucide-react';
import EditBucketDialog from "@/components/main_components/dialog/EditBucketDialog";
import BucketsDeleteDialog from '../dialog/BucketsDeleteDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProgressBar from '@/components/sub_components/progress_bar/progress_bar';

import PriorityBadge from '@/components/sub_components/badges/prioritybadge';
import StatusBadge from '@/components/sub_components/badges/statusbadge';
import TypeBadge from '@/components/sub_components/badges/typebadge';
import TagBadge from '@/components/sub_components/badges/tagbadge';

interface BucketsCardProps {
  id: string;
  name: string;
  description: string;
  progress: number;
  assignedTaskCount: number;
  completedTaskCount: number;
  priority: 'high' | 'medium' | 'low';
  status: 'started' | 'not_started' | 'on_hold';
  type: string;
  tag: string;
  onEdit: (name: string, description: string) => void;
  onDelete: () => void;
}

const Buckets_cards: React.FC<BucketsCardProps> = ({
  id,
  name,
  description,
  progress,
  assignedTaskCount,
  completedTaskCount,
  priority,
  status,
  type,
  tag,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  console.log("Received data:", {id, name, description, progress, assignedTaskCount, completedTaskCount, priority, status, type, tag });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleConfirmDelete = () => {
    // setShowDropdown(false);
    setShowDeleteDialog(true);
    // onDelete();
  };

  const handleCardClick = () => {
    router.push(`/buckets/${id}`);
  };

  return (
    <>
      <div
        className="bg-white p-4 max-h-[270px] flex flex-col rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300 relative h-full"
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={priority} />
            <StatusBadge status={status} />
          </div>

          <Ellipsis
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown((prev) => !prev);
            }}
            className="size-5 text-gray-500 cursor-pointer"
          />

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-8 right-4 z-10 bg-white border rounded-md shadow-lg p-1 w-30"
            >
              <div
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                <Edit className="size-4" />
                Edit
              </div>
              <div
                className="flex items-center gap-2 px-2 py-1 text-sm text-red-600 hover:bg-red-100 cursor-pointer rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleConfirmDelete();
                }}
              >
                <Trash className="size-4" />
                Delete
              </div>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="flex flex-col items-start gap-1 w-full flex-grow">
          <div className="overflow-hidden w-full">
            <span className="font-semibold text-lg break-words">{name}</span>
          </div>

          <div className="min-h-[40px] max-h-[60px] overflow-hidden w-full mb-2">
            <span className="text-sm text-gray-600 break-words line-clamp-2">
              {description}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap mt-1">
            <TypeBadge type={type} />
            <TagBadge tag={tag} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <ProgressBar progress={progress} totalSegments={40} />
          <div className="mt-1 flex justify-between text-xs text-gray-600">
            <span>{progress}% Completed</span>
            <span>{completedTaskCount}/{assignedTaskCount} Tasks</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Paperclip className="size-4" /> 0
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MessageSquare className="size-4" /> 0
            </div>
          </div>
        </div>
      </div>

      {showEditDialog && (
        <EditBucketDialog
          bucket_id={id}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          
          onCreate={(newName, newDescription) => onEdit(newName, newDescription)}
        />
      )}

      {showDeleteDialog && (
        <BucketsDeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onDelete={onDelete}
          bucketName={name}
          bucket_id={id}
        />
      )}
    </>
  );
};

export default Buckets_cards;
