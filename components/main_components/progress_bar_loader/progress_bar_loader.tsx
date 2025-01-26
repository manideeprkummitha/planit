'use client';
import React, { useState, useEffect } from "react";

interface SegmentProgressBarProps {
  totalSegments: number; // Total number of segments
  loadingTime?: number; // Time for the loader to complete (in ms)
}

const SegmentProgressBarLoader: React.FC<SegmentProgressBarProps> = ({
  totalSegments,
  loadingTime = 3000, // Default to 3 seconds
}) => {
  const [progress, setProgress] = useState(0); // Tracks the current progress percentage

  // Animate the progress value
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + 1; // Increment progress
        return nextValue > 100 ? 100 : nextValue; // Cap at 100%
      });
    }, loadingTime / 100); // Adjust increment frequency based on total loading time

    return () => clearInterval(interval); // Cleanup on unmount
  }, [loadingTime]);

  // Calculate how many segments to fill
  const filledSegments = Math.round((progress / 100) * totalSegments);

  // Determine the color of each segment
  const getSegmentColor = (index: number) => {
    if (index < filledSegments) {
      if (progress <= 25) return "bg-red-500";
      if (progress <= 50) return "bg-orange-500";
      if (progress <= 75) return "bg-yellow-500";
      return "bg-green-500";
    }
    return "bg-gray-300";
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalSegments }, (_, index) => (
        <div
          key={index}
          className={`h-3 w-2 rounded-full ${getSegmentColor(index)}`}
        ></div>
      ))}
    </div>
  );
};

export default SegmentProgressBarLoader;
