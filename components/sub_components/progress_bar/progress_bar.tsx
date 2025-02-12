import React from "react";

interface ProgressBarProps {
  progress: number; // Progress percentage (0-100)
  totalSegments: number; // Total number of segments
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, totalSegments }) => {
  // Calculate the number of filled segments based on the progress percentage
  const filledSegments = Math.round((progress / 100) * totalSegments);

  // Function to determine the color of a segment based on its index
  const getSegmentColor = (index: number) => {
    if (index < filledSegments) {
      if (progress < 25) return "bg-red-500";
      else if (progress < 50) return "bg-orange-500";
      else if (progress < 75) return "bg-yellow-500";
      else return "bg-green-500";
    }
    return "bg-gray-300"; // Default color for unfilled segments
  };

  // Function to determine if hover effects should be applied
  const isHoverable = (index: number) => index < filledSegments;

  return (
    <div className="flex space-x-1">
      {/* Generate segments dynamically based on totalSegments */}
      {Array.from({ length: totalSegments }, (_, index) => (
        <div
          key={index}
          className={`h-4 w-1 rounded-md transition-transform duration-300 ${
            isHoverable(index) ? "hover:scale-150 hover:animate-wave" : ""
          } ${getSegmentColor(index)}`}
          style={{
            animationDelay: isHoverable(index) ? `${index * 50}ms` : undefined, // Delayed wave effect
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
