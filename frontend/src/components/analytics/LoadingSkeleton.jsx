import { motion } from "framer-motion";

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm h-[120px] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-lg"></div>
              <div className="h-4 w-20 bg-gray-100 rounded-md"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[400px] flex flex-col">
             <div className="h-6 w-40 bg-gray-200 rounded-md mb-2"></div>
             <div className="h-4 w-56 bg-gray-100 rounded-md mb-8"></div>
             <div className="flex-1 bg-gray-50 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Three Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[400px] flex flex-col">
           <div className="h-6 w-40 bg-gray-200 rounded-md mb-2"></div>
           <div className="h-4 w-56 bg-gray-100 rounded-md mb-8"></div>
           <div className="flex-1 bg-gray-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[400px] flex flex-col">
               <div className="h-6 w-32 bg-gray-200 rounded-md mb-2"></div>
               <div className="h-4 w-48 bg-gray-100 rounded-md mb-8"></div>
               <div className="flex-1 bg-gray-50 rounded-full mx-auto w-48 h-48 my-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table & Insights Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-64 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-50 rounded-lg"></div>
            <div className="h-12 bg-gray-50 rounded-lg"></div>
            <div className="h-12 bg-gray-50 rounded-lg"></div>
            <div className="h-12 bg-gray-50 rounded-lg"></div>
            <div className="h-12 bg-gray-50 rounded-lg"></div>
          </div>
        </div>
        
        {/* Insights Skeleton */}
        <div className="xl:col-span-4 bg-indigo-50/50 rounded-2xl p-6 md:p-8 border border-indigo-50 shadow-sm h-[500px] flex flex-col">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-indigo-100 rounded-xl"></div>
             <div className="h-6 w-40 bg-indigo-100 rounded-md"></div>
           </div>
           <div className="space-y-4 flex-1">
             <div className="h-24 w-full bg-white rounded-xl border border-indigo-50"></div>
             <div className="h-24 w-full bg-white rounded-xl border border-indigo-50"></div>
             <div className="h-24 w-full bg-white rounded-xl border border-indigo-50"></div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
