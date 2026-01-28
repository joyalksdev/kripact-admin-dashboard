import React from "react";
import {
  HiOutlineHomeModern,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineBriefcase,
} from "react-icons/hi2";
const stats = [
  {
    label: "Total Residents",
    value: "312",
    icon: HiOutlineHomeModern,
    accent: {
      line: "bg-indigo-500",
      text: "text-indigo-400",
      border: "border-indigo-500/30",
    },
  },
  {
    label: "Senior Citizens",
    value: "187",
    icon: HiOutlineUserGroup,
    accent: {
      line: "bg-emerald-500",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
  },
  {
    label: "Mentally Ill",
    value: "125",
    icon: HiOutlineHeart,
    accent: {
      line: "bg-amber-500",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
  },
  {
    label: "Staff Members",
    value: "42",
    icon: HiOutlineBriefcase,
    accent: {
      line: "bg-violet-500",
      text: "text-violet-400",
      border: "border-violet-500/30",
    },
  },
];

const StatsBar = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={`
              relative bg-neutral-900/80 backdrop-blur
              rounded-2xl p-6
              border ${item.accent.border}
              shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              transition ease-in-out
              overflow-hidden hover:scale-102
            `}
          >
            {/* Top accent line */}
            <span
              className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl ${item.accent.line}`}
            />

            {/* Icon */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-neutral-400">
                {item.label}
              </p>
              <Icon className={`text-2xl ${item.accent.text}`} />
            </div>

            {/* Value */}
            <h2 className={`text-3xl font-semibold ${item.accent.text}`}>
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
