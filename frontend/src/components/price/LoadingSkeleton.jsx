import { motion } from "framer-motion";

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-32 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
            </div>
            <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Chart Skeleton */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[400px] flex flex-col">
           <div className="h-6 w-48 bg-gray-200 rounded-md mb-2"></div>
           <div className="h-4 w-64 bg-gray-100 rounded-md mb-8"></div>
           <div className="flex-1 bg-gray-50 rounded-xl"></div>
        </div>

        {/* Insights Skeleton */}
        <div className="xl:col-span-4 bg-indigo-50/50 rounded-2xl p-6 md:p-8 border border-indigo-50 shadow-sm h-[400px] flex flex-col">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-indigo-100 rounded-xl"></div>
             <div className="h-6 w-40 bg-indigo-100 rounded-md"></div>
           </div>
           <div className="space-y-4 flex-1">
             <div className="h-4 w-full bg-indigo-100/70 rounded"></div>
             <div className="h-4 w-full bg-indigo-100/70 rounded"></div>
             <div className="h-4 w-3/4 bg-indigo-100/70 rounded"></div>
             <div className="h-4 w-5/6 bg-indigo-100/70 rounded"></div>
           </div>
           <div className="mt-6 flex gap-3">
             <div className="h-8 w-24 bg-white rounded-lg border border-indigo-50"></div>
             <div className="h-8 w-24 bg-white rounded-lg border border-indigo-50"></div>
           </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
          <div className="h-10 w-64 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-50 rounded-lg"></div>
          <div className="h-12 bg-gray-50 rounded-lg"></div>
          <div className="h-12 bg-gray-50 rounded-lg"></div>
          <div className="h-12 bg-gray-50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
