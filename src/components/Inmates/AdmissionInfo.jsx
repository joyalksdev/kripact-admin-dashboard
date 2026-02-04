const formatDate = (ts) =>
  ts?.seconds ? new Date(ts.seconds * 1000).toLocaleDateString() : "—";

const AdmissionInfo = ({ admission }) => {
  if (!admission) return null;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
      <h3 className="font-semibold">Admission Details</h3>

      <Info label="Admitted On" value={formatDate(admission.admittedOn)} />
      <Info label="Ward" value={admission.ward} />
      <Info label="Category" value={admission.category?.join(", ")} />
      <Info label="Reason" value={admission.reason} />
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-neutral-400">{label}</p>
    <p className="text-sm">{value || "—"}</p>
  </div>
);

export default AdmissionInfo;
