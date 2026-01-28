import React from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const DonationSummary = () => {
  return (
    <div className="
      bg-neutral-900/80 backdrop-blur
      rounded-2xl p-6
      border border-neutral-800
      shadow-[0_8px_30px_rgba(0,0,0,0.35)]
    ">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <HiOutlineCurrencyRupee className="text-emerald-400 text-xl" />
        <h3 className="text-white font-semibold">
          Donation Summary
        </h3>
      </div>

      {/* Main highlight */}
      <div className="mb-6">
        <p className="text-sm text-neutral-400 mb-1">
          This Month
        </p>
        <p className="text-3xl font-semibold text-emerald-400">
          ₹1,24,000
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-800 my-4" />

      {/* Secondary stats */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-400">
            Last Donation
          </span>
          <span className="text-white font-medium">
            ₹5,000
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-400">
            Total Donations
          </span>
          <span className="text-white font-medium">
            ₹18,45,000
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonationSummary;
