"use client";

import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Bucket {
  id: string;
  name: string;
  description: string;
  // priority_level?: number;
}

interface BucketSettingsFormProps {
  buckets: Bucket[];
  setBuckets: (buckets: Bucket[]) => void;
}

export default function BucketSettingsForm({
  buckets,
  setBuckets,
}: BucketSettingsFormProps) {
  // On drag end, reorder locally AND update the server
  console.log("Received buckets from settings dialog:", buckets);
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    // If dropped outside or no change in position, do nothing
    if (!destination || source.index === destination.index) return;

    // Reorder locally
    const updated = Array.from(buckets);
    const [removed] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, removed);
    setBuckets(updated);

    // Update each bucket's priority_level with PUT or PATCH
    try {
      await Promise.all(
        updated.map((bucket, idx) =>
          fetch(`/api/buckets/${bucket.id}`, {
            method: "PUT", // or PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              priority_level: String(idx + 1),
            }),
          })
        )
      );
      console.log("Bucket priorities updated!");
    } catch (error) {
      console.error("Error updating bucket priorities:", error);
      // Optionally revert local state or show an error
    }
  };

  return (
    <div className="max-h-72 overflow-y-auto custom-scrollbar">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="buckets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4 p-2"
            >
              {buckets.map((bucket, index) => (
                <Draggable
                  key={bucket.id}
                  draggableId={bucket.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        cursor: "grab", // visual cue
                      }}
                      className={`p-4 border rounded-md shadow-sm transition-transform duration-300 ${
                        snapshot.isDragging
                          ? "bg-blue-50 scale-105 shadow-lg"
                          : "bg-white hover:shadow-md hover:scale-[1.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{bucket.name}</h3>
                        <p className="text-xs font-medium">
                          Priority: {index + 1}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {bucket.description}
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* Placeholder needed by Droppable */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
