'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Define the structure of a single bucket
interface Bucket {
  id: string; // Unique identifier for the bucket
  title: string; // Title of the bucket
  description: string; // Description of the bucket
}

// Props for the BucketSettingsForm component
interface BucketSettingsFormProps {
  buckets: Bucket[]; // Array of bucket objects
  setBuckets: (buckets: Bucket[]) => void; // Function to update the buckets array
}

const BucketSettingsForm: React.FC<BucketSettingsFormProps> = ({
  buckets,
  setBuckets,
}) => {
  // Function to handle the end of a drag-and-drop operation
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // If the item is dropped outside the valid area, do nothing

    // Create a copy of the buckets array to reorder without mutating the original
    const reorderedBuckets = Array.from(buckets);

    // Remove the dragged item from its original position
    const [removed] = reorderedBuckets.splice(result.source.index, 1);

    // Insert the dragged item into its new position
    reorderedBuckets.splice(result.destination.index, 0, removed);

    // Update the state with the reordered buckets
    setBuckets(reorderedBuckets);
  };

  return (
    <div className="p-1 overflow-y-auto max-h-72 custom-scrollbar">
      {/* Instructional text for the user */}
      <p className="text-sm mb-6">
        Drag and drop the cards below to adjust bucket priorities. The top card
        represents the highest priority.
      </p>

      {/* DragDropContext wraps the drag-and-drop logic */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Droppable defines the area where items can be dropped */}
        <Droppable droppableId="buckets">
          {(provided) => (
            <div
              {...provided.droppableProps} // Apply Droppable-specific props
              ref={provided.innerRef} // Set the ref for the droppable area
              className="space-y-4" // Styling for vertical spacing between items
            >
              {/* Map over buckets to create a draggable item for each */}
              {buckets.map((bucket, index) => (
                <Draggable
                  key={bucket.id} // Unique key for React to track this element
                  draggableId={bucket.id} // Unique ID for drag-and-drop library
                  index={index} // Index in the list
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef} // Set the ref for the draggable item
                      {...provided.draggableProps} // Apply draggable-specific props
                      {...provided.dragHandleProps} // Apply props to the drag handle (entire item in this case)
                      className={`p-4 border border-black rounded-md shadow-sm ${
                        snapshot.isDragging ? 'bg-blue-50' : 'bg-white' // Change background color while dragging
                      } transition-shadow duration-300`} // Smooth shadow transition
                    >
                     <div className='flex items-center justify-between'>
                        {/* Display the bucket title */}
                        <h3 className="text-lg font-semibold">{bucket.title}</h3>

                        {/* Display the priority level based on the current index */}
                        <p className="text-xs mt-2">
                        Priority Level: {index + 1}
                        </p>
                     </div>
                      {/* Display the bucket description */}
                      <p className="text-sm text-gray-600">
                        {bucket.description}
                      </p>
                    
                    </div>
                  )}
                </Draggable>
              ))}
              {/* Placeholder ensures proper spacing when dragging items */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BucketSettingsForm;
