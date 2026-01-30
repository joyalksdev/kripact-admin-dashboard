import { HiOutlineEye, HiOutlineDocumentText } from "react-icons/hi2";

const InmateCard = ({ inmate, onView }) => {
  return (
    <div
      className="
        relative rounded-2xl bg-neutral-900 overflow-hidden
        border border-neutral-800
        p-5 flex gap-4 items-start
        hover:border-indigo-500/50
        transition
      "
    >
      {/* Status Strip */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl
          ${inmate.status === "critical" ? "bg-red-500" :
            inmate.status === "stable" ? "bg-green-500" :
            "bg-yellow-500"}
        `}
      />

      {/* Avatar */}
      <img
        src={inmate.photo || `https://api.dicebear.com/9.x/initials/svg?seed=${inmate.name}`}
        alt={inmate.name}
        className="w-14 h-14 rounded-full object-cover"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-white font-semibold">{inmate.name}</h3>
        <p className="text-sm text-neutral-400">
          {inmate.age} yrs · {inmate.gender}
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          ID: {inmate.id}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {inmate.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(inmate)}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
        >
          <HiOutlineEye />
        </button>

        <button className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">
          <HiOutlineDocumentText />
        </button>
      </div>
    </div>
  );
};

export default InmateCard;
