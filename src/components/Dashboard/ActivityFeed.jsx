import React from "react";
import {
  HiOutlineUserPlus,
  HiOutlineCurrencyRupee,
  HiOutlineCalendarDays,
  HiOutlineBriefcase,
} from "react-icons/hi2";

const activities = [
  {
    text: "New resident admitted",
    icon: HiOutlineUserPlus,
    color: "text-indigo-400",
  },
  {
    text: "Donation received",
    icon: HiOutlineCurrencyRupee,
    color: "text-emerald-400",
  },
  {
    text: "Medical checkup scheduled",
    icon: HiOutlineCalendarDays,
    color: "text-amber-400",
  },
  {
    text: "New staff member added",
    icon: HiOutlineBriefcase,
    color: "text-violet-400",
  },
];

const ActivityFeed = () => {
  return (
    <div className="
      bg-neutral-900/80 backdrop-blur
      rounded-2xl p-6
      border border-neutral-800
      shadow-[0_8px_30px_rgba(0,0,0,0.35)]
    ">
      {/* Header */}
      <h3 className="text-white font-semibold mb-6">
        Recent Activity
      </h3>

      {/* Timeline */}
      <div className="space-y-5">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center
                  w-9 h-9 rounded-full
                  bg-neutral-800
                  ${item.color}
                  shrink-0
                `}
              >
                <Icon className="text-lg" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-white">
                  {item.text}
                </p>

                {/* Divider (except last) */}
                {index !== activities.length - 1 && (
                  <div className="h-px bg-neutral-800 mt-4" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
