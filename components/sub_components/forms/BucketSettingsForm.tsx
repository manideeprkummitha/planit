'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Bucket {
  id: string;
  title: string;
  description: string;
}

interface BucketSettingsFormProps {
  buckets: Bucket[];
  setBuckets: (buckets: Bucket[]) => void;
}

const BucketSettingsForm: React.FC<BucketSettingsFormProps> = ({
  buckets,
  setBuckets,
}) => {
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const reorderedBuckets = Array.from(buckets);
    const [removed] = reorderedBuckets.splice(source.index, 1);
    reorderedBuckets.splice(destination.index, 0, removed);
    setBuckets(reorderedBuckets);
  };

  return (
    <div className="overflow-y-auto max-h-72 custom-scrollbar ">
      {/* <p className="text-sm mb-6">
        Drag and drop the cards below to adjust bucket priorities. The top card
        represents the highest priority.
      </p> */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="buckets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4 border-2 border-dashed border-gray-300 p-4 bg-gray-100 rounded-md"
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
                      className={`p-4 border rounded-md shadow-sm transition-transform duration-300 ${
                        snapshot.isDragging
                          ? 'bg-blue-50 scale-105 shadow-lg'
                          : 'bg-white hover:shadow-md hover:scale-[1.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{bucket.title}</h3>
                        <p className="text-xs font-medium">Priority Level set to: {index + 1}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {bucket.description}
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BucketSettingsForm;
