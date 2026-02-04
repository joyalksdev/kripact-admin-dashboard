const InmateDetails = ({ inmate }) => {
  
  if (!inmate) return null;
  
  const formatDate = (ts) => {
    if (!ts || !ts.seconds) return "—";
    return new Date(ts.seconds * 1000).toLocaleDateString();
  };

  return (
    
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={
            inmate.photo ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${inmate.name}`
          }
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{inmate.name || "Unnamed"}</h2>
          <p className="text-neutral-400">
            {inmate.age || "-"} yrs · {inmate.gender || "-"}
          </p>
          <p className="text-xs text-neutral-500">
            ID: {inmate.id || "—"}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 gap-4">
        <Info
          label="Category"
          value={
            Array.isArray(inmate.tags) && inmate.tags.length
              ? inmate.tags.join(", ")
              : "—"
          }
        />
        <Info label="Status" value={inmate.status || "—"} />
        <Info label="Ward" value={inmate.ward || "—"} />
        <Info label="Admitted On" value={formatDate(inmate.admittedOn)} />

      </div>

      <div>
        <h4 className="font-medium mb-2">Medical Notes</h4>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {inmate.medicalNotes || "No medical notes"}
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
