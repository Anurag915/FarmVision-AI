import { motion } from "framer-motion";

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-96 flex flex-col">
           <div className="h-6 w-48 bg-gray-200 rounded-md mb-2"></div>
           <div className="h-4 w-32 bg-gray-100 rounded-md mb-8"></div>
           <div className="flex-1 bg-gray-50 rounded-xl"></div>
        </div>
        <div className="xl:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <div className="h-6 w-32 bg-gray-200 rounded-md mb-6"></div>
           <div className="h-32 bg-gray-50 rounded-xl"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="h-8 w-48 bg-gray-200 rounded-md mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-50 rounded-lg"></div>
          <div className="h-12 bg-gray-50 rounded-lg"></div>
          <div className="h-12 bg-gray-50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
