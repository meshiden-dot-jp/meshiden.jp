import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[1vw] sm:gap-[1.5vw] gap-[5vw]">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col min-h-0">
          <Skeleton className="w-full aspect-[16/9] rounded-xl" />
          <Skeleton className="w-32 h-3 rounded-xl my-[3%]" />
          <Skeleton className="w-full h-4 rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
