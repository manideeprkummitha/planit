'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { Ellipsis, Edit, Trash, Paperclip, MessageSquare } from 'lucide-react';
import EditBucketDialog from "@/components/main_components/dialog/EditBucketDialog";
import { ArrowBigUpDash, ArrowBigDownDash, ArrowBigRightDash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProgressBar from '@/components/sub_components/progress_bar/progress_bar';
const Buckets_cards = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast(); // Use the toast hook for notifications

  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const bucketTitle = "Project Alpha";
  const bucketDescription = "This bucket contains tasks for Project Alpha.";
  const progressValue = 80;
  const assignedTaskCount = 10;
  const completedTaskCount = 8.5;

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

  const handleDelete = () => {
    setShowDropdown(false);
    toast({
      title: "Bucket Deleted",
      description: `Bucket "${bucketTitle}" has been successfully deleted.`,
      variant: "destructive",
    });
  };

  const handleCardClick = () => {
    router.push(`/buckets/${id}`);
  };

  return (
    <>
      <div
        className="bg-white p-4 flex flex-col rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-start justify-center gap-2">
            <Badge variant="outline" className="text-[12px] bg-red-50 border-red-300 gap-1 text-red-600">
              <ArrowBigUpDash className="size-4 hover:scale-125" /> High
            </Badge>
            {/* <Badge variant="outline" className="text-[12px] bg-orange-50 border-orange-300 gap-1 text-orange-600">
              <ArrowBigRightDash className="size-4" /> Medium
            </Badge>
            <Badge variant="outline" className="text-[12px] bg-green-50 border-green-300 gap-1 text-green-600">
              <ArrowBigDownDash className="size-4" /> Low
            </Badge> */}
          </div>

          <Ellipsis
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown((prev) => !prev);
            }}
            className="size-5 text-gray-500 hover:text-gray-700 transition-transform duration-250 transform hover:scale-110 cursor-pointer"
          />

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-8 right-4 z-10 bg-white border border-gray-200 rounded-md shadow-lg p-1 w-30"
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
                  handleDelete();
                }}
              >
                <Trash className="size-4" />
                Delete
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start justify-between gap-2">
          <div className="px-1 flex flex-col items-start">
            <span className="font-semibold text-lg hover:scale-95 "onClick={handleCardClick}>{bucketTitle}</span>
            <span className="text-sm text-gray-600">{bucketDescription}</span>
          </div>

          <div className="flex items-start w-full justify-between gap-2">
            <div className="flex gap-2 items-center flex-col justify-start">
              <div className="flex items-start justify-center gap-2">
                <Badge variant="outline" className="text-[12px] bg-green-50 p-1 text-green-600 border-green-600">
                  Type: Development
                </Badge>
                <Badge variant="outline" className="text-[12px] bg-green-50 p-1 text-green-600 border-green-600">
                  Tag: Finance
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-1">
          {/* <Progress value={progressValue} color="green" /> */}
          <ProgressBar progress={progressValue} totalSegments={32} />
          <div className="mt-1 flex justify-between text-xs text-gray-600">
            <span>{progressValue}% Completed</span>
            <span>
              {completedTaskCount}/{assignedTaskCount} Tasks
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Avatar className='hover:scale-110 h-5 w-5'>
              <AvatarImage src="https://github.com/shadcn.png" className='h-5 w-5' alt="User Avatar" />
              <AvatarFallback className='h-5 w-5'>AR</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-1 text-gray-600 text-[12px]">
              <Paperclip className="size-4 hover:scale-110" /> 9
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-[12px]">
              <MessageSquare className="size-4 hover:scale-110" /> 10
            </div>
          </div>
        </div>
      </div>

      {showEditDialog && (
        <EditBucketDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onCreate={(bucketName, bucketDescription) =>
            console.log(`Bucket Created: ${bucketName}, ${bucketDescription}`)
          }
        />
      )}
    </>
  );
};

export default Buckets_cards;
