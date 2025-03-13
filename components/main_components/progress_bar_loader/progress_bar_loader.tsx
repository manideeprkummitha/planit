// 'use client';
// import React, { useState, useEffect } from "react";

// interface SegmentProgressBarProps {
//   totalSegments: number; // Total number of segments
//   loadingTime?: number; // Time for the loader to complete (in ms)
// }

// const SegmentProgressBarLoader: React.FC<SegmentProgressBarProps> = ({
//   totalSegments,
//   loadingTime = 3000, // Default to 3 seconds
// }) => {
//   const [progress, setProgress] = useState(0); // Tracks the current progress percentage

//   // Animate the progress value
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const nextValue = prev + 1; // Increment progress
//         return nextValue > 100 ? 100 : nextValue; // Cap at 100%
//       });
//     }, loadingTime / 100); // Adjust increment frequency based on total loading time

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [loadingTime]);

//   // Calculate how many segments to fill
//   const filledSegments = Math.round((progress / 100) * totalSegments);

//   // Determine the color of each segment
//   const getSegmentColor = (index: number) => {
//     if (index < filledSegments) {
//       if (progress <= 25) return "bg-red-500";
//       if (progress <= 50) return "bg-orange-500";
//       if (progress <= 75) return "bg-yellow-500";
//       return "bg-green-500";
//     }
//     return "bg-gray-300";
//   };

//   return (
//     <div className="flex space-x-1">
//       {Array.from({ length: totalSegments }, (_, index) => (
//         <div
//           key={index}
//           className={`h-3 w-2 rounded-full ${getSegmentColor(index)}`}
//         ></div>
//       ))}
//     </div>
//   );
// };

// export default SegmentProgressBarLoader;

"use client";
import React, { useState, useEffect } from "react";

interface SegmentProgressBarProps {
  totalSegments: number; // Total number of segments
  loadingTime?: number; // Time for the loader to complete (in ms)
}

const SegmentProgressBarLoader: React.FC<SegmentProgressBarProps> = ({
  totalSegments,
  loadingTime = 3000, // Default 3 seconds
}) => {
  const [progress, setProgress] = useState(0); // Tracks loading progress
  const [colorIndex, setColorIndex] = useState(0); // Tracks changing color

  // Define a cycling list of colors
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-purple-500"];

  useEffect(() => {
    // Progress increment logic
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100)); // Increment progress
    }, loadingTime / 100); // Adjusted speed for smooth animation

    // Color shifting logic
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length); // Cycle through colors
    }, 100); // Change colors every 200ms for a smooth transition

    return () => {
      clearInterval(progressInterval);
      clearInterval(colorInterval);
    };
  }, [loadingTime]);

  // Determine how many segments to fill
  const filledSegments = Math.round((progress / 100) * totalSegments);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalSegments }, (_, index) => (
        <div
          key={index}
          className={`h-6 w-1 rounded-full transition-transform duration-300 ${index < filledSegments ? colors[colorIndex] : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
};

export default SegmentProgressBarLoader;
