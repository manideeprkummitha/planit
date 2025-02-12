"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Clock,
  Sun,
  CircleCheck,
  CalendarIcon,
  Pencil,
  Ellipsis,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { z } from "zod";

import { DataTable } from "@/components/table_components/data-table";
import { columns } from "@/components/table_components/columns";
import { taskSchema } from "@/lib/schema";

import EditBucketDialog from "@/components/main_components/dialog/EditBucketDialog";
import PriorityBadge from "@/components/sub_components/badges/prioritybadge";
import StatusBadge from "@/components/sub_components/badges/statusbadge";
import TypeBadge from "@/components/sub_components/badges/typebadge";
import TagBadge from "@/components/sub_components/badges/tagbadge";

export default function Page() {
  const { id } = useParams();
  const [bucketDetails, setBucketDetails] = useState<any>(null);
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBucketDetails() {
      try {
        const response = await fetch(`/api/buckets/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching bucket details");
        }
        const data = await response.json();
        setBucketDetails(data);
      } catch (error) {
        console.error("Error fetching bucket details:", error);
        setBucketDetails(null);
        setFetchError("Could not load bucket details. Please try again.");
      }
    }

    async function fetchBucketTasks() {
      try {
        const response = await fetch(`/api/tasks?bucket_id=${id}`);
        if (!response.ok) {
          throw new Error("Error fetching tasks for this bucket");
        }
        const data = await response.json();
        const validatedTasks = z.array(taskSchema).parse(data);
        setTasks(validatedTasks);
      } catch (error) {
        console.error("Error fetching tasks for bucket:", error);
        setTasks([]);
        setFetchError("Could not load tasks for this bucket. Please try again.");
      }
    }

    if (id) {
      fetchBucketDetails();
      fetchBucketTasks();
    }
  }, [id]);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.maxHeight = "none";
    const fullHeight = el.scrollHeight;

    if (isDescriptionExpanded) {
      el.style.maxHeight = el.offsetHeight + "px";
      requestAnimationFrame(() => {
        el.style.transition = "max-height 0.3s ease";
        el.style.maxHeight = fullHeight + "px";
      });
    } else {
      el.style.maxHeight = fullHeight + "px";
      requestAnimationFrame(() => {
        el.style.transition = "max-height 0.3s ease";
        el.style.maxHeight = "6rem";
      });
    }
  }, [isDescriptionExpanded]);

  const handleTransitionEnd = () => {
    const el = descRef.current;
    if (!el) return;
    if (isDescriptionExpanded) {
      el.style.maxHeight = "none";
    }
    el.style.transition = "none";
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  if (!bucketDetails && !fetchError) {
    return <p>Loading bucket details...</p>;
  }

  const hasManyWords = bucketDetails?.description?.split(" ").length > 50;

  return (
    <div className="flex flex-col items-center justify-start w-full p-6 bg-white">
      <div className="w-full flex items-center justify-between">
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-semibold mb-4">
                {bucketDetails ? bucketDetails.name : "No Bucket Found"}
              </h1>
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
                        setShowEditDialog(true);
                      }}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </div>
                  </div>
                )}
              </div>
            </div>

            {bucketDetails?.description && (
              <div className="mt-1 w-full max-w-[600px] rounded-md mb-6 relative">
                <div
                  ref={descRef}
                  onTransitionEnd={handleTransitionEnd}
                  className="overflow-hidden text-gray-700"
                  style={{ maxHeight: isDescriptionExpanded ? "none" : "6rem" }}
                >
                  {bucketDetails.description}
                </div>
                {hasManyWords && (
                  <button
                    className="absolute bottom-1 right-0 text-red-500 bg-white px-1 hover:underline"
                    onClick={toggleDescription}
                  >
                    {isDescriptionExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            )}

            {bucketDetails && (
              <div className="flex flex-col items-start justify-start gap-3 w-full">
                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <CircleCheck className="size-4 text-gray-700" />
                    <span className="text-md text-gray-700">Type</span>
                  </div>
                  <TypeBadge type={bucketDetails.type} />
                </div>

                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-gray-700" />
                    <span className="text-md text-gray-700">Status</span>
                  </div>
                  <StatusBadge status={bucketDetails.status} />
                </div>

                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gray-700" />
                    <span className="text-md text-gray-700">Priority</span>
                  </div>
                  <PriorityBadge priority={bucketDetails.priority} />
                </div>

                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <CircleCheck className="size-4 text-gray-700" />
                    <span className="text-md text-gray-700">Tag</span>
                  </div>
                  {bucketDetails.tag.map((tag: string) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>

                <div className="flex items-center justify-between w-full max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-gray-700" />
                    <span className="text-md text-gray-700">Due Date</span>
                  </div>
                  <span className="text-md">
                    {bucketDetails.due_date || "No due date"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full mt-12">
        <div className="w-full max-w-full">
          <DataTable
            data={tasks}
            columns={columns}
            errorMessage={fetchError || undefined}
            bucket_Id={id} 
          />
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
    </div>
  );
}
