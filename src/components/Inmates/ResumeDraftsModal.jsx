import { useEffect, useState } from "react";
import {
  getMyDrafts,
  deleteDraft,
} from "@/services/admissionDrafts";

const STEP_LABELS = ["Basic Info", "Family", "Medical", "Admission"];

const ResumeDraftsModal = ({ user, onSelect, onClose }) => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDrafts = async () => {
    setLoading(true);
    const data = await getMyDrafts(user.uid);
    setDrafts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDrafts();
  }, [user]);

  const handleDelete = async (id) => {
    const ok = confirm("Delete this draft permanently?");
    if (!ok) return;

    await deleteDraft(id);
    loadDrafts();
  };

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold">Resume Draft</h3>

      {loading && (
        <p className="text-sm text-neutral-400">Loading drafts…</p>
      )}

      {!loading && drafts.length === 0 && (
        <div className="text-center py-6 text-neutral-400 text-sm">
          No drafts found
        </div>
      )}

      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="flex justify-between items-center p-4 rounded-xl bg-neutral-900 border border-neutral-800"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Step {draft.step + 1} / 4 ·{" "}
              <span className="text-neutral-400">
                {STEP_LABELS[draft.step] || "Unknown"}
              </span>
            </p>

            <p className="text-xs text-neutral-500">
              Last updated:{" "}
              {draft.updatedAt?.toDate?.().toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSelect(draft.id)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-sm"
            >
              Resume
            </button>

            <button
              onClick={() => handleDelete(draft.id)}
              className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-sm hover:bg-red-600/30"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-3 border-t border-neutral-800">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-neutral-800 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResumeDraftsModal;
