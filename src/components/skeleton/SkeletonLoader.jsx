import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-4 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md">
      <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-20 bg-gray-400 dark:bg-gray-600 rounded w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
