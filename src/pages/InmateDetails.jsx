
const InmateDetails = ({ inmate }) => {
  if (!inmate) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={inmate.photo || "https://i.pravatar.cc/100"}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{inmate.name}</h2>
          <p className="text-neutral-400">
            {inmate.age} yrs · {inmate.gender}
          </p>
          <p className="text-xs text-neutral-500">
            ID: {inmate.id}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 gap-4">
        <Info label="Category" value={inmate.tags.join(", ")} />
        <Info label="Status" value={inmate.status} />
        <Info label="Ward" value={inmate.ward} />
        <Info label="Admitted On" value={inmate.admittedOn} />
      </div>

      <div>
        <h4 className="font-medium mb-2">Medical Notes</h4>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {inmate.notes}
        </p>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-neutral-800/60 rounded-xl p-3">
    <p className="text-xs text-neutral-400">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

export default InmateDetails;
