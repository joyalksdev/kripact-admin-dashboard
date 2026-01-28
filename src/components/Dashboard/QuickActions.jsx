import React from "react";
import {
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineCurrencyRupee,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

const actions = [
  {
    label: "Add New Resident",
    icon: HiOutlineUserPlus,
    accent: "text-indigo-400",
  },
  {
    label: "Add Staff",
    icon: HiOutlineUsers,
    accent: "text-emerald-400",
  },
  {
    label: "Record Donation",
    icon: HiOutlineCurrencyRupee,
    accent: "text-amber-400",
  },
  {
    label: "Schedule Checkup",
    icon: HiOutlineCalendarDays,
    accent: "text-violet-400",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-neutral-900/80 backdrop-blur rounded-2xl p-6 border border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <h3 className="text-white font-semibold mb-5">
        Quick Actions
      </h3>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              className="
                group flex items-center gap-4
                bg-neutral-800/70
                rounded-xl px-4 py-4
                border border-neutral-700
                text-left
                transition
                hover:bg-neutral-800
                focus:outline-none
              "
            >
              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center
                  w-10 h-10 rounded-lg
                  bg-neutral-900
                  ${action.accent}
                `}
              >
                <Icon className="text-xl" />
              </div>

              {/* Label */}
              <span className="text-sm font-medium text-white">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
