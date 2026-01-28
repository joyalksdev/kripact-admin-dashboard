import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineChartPie,
} from "react-icons/hi2";

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      
      {/* Main Chart */}
      <div
        className="
          xl:col-span-2
          bg-neutral-900/80 backdrop-blur
          rounded-2xl p-6
          border border-neutral-800
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        "
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <HiOutlineChartBar className="text-indigo-400 text-xl" />
          <h3 className="text-white font-semibold">
            Monthly Overview
          </h3>
        </div>

        {/* Placeholder */}
        <div className="
          h-64
          rounded-xl
          border border-dashed border-neutral-700
          flex items-center justify-center
          text-sm text-neutral-500
        ">
          Chart will appear here
        </div>
      </div>

      {/* Side Chart */}
     {/* 
     
      <div
        className="
          bg-neutral-900/80 backdrop-blur
          rounded-2xl p-6
          border border-neutral-800
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        "
      >
        
        <div className="flex items-center gap-2 mb-6">
          <HiOutlineChartPie className="text-violet-400 text-xl" />
          <h3 className="text-white font-semibold">
            Residents Breakdown
          </h3>
        </div>

      
        <div className="
          h-64
          rounded-xl
          border border-dashed border-neutral-700
          flex items-center justify-center
          text-sm text-neutral-500
        ">
          Chart will appear here
        </div>
      </div>
      
     */}
    </div>
  );
};

export default ChartsSection;
