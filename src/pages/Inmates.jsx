import { useEffect, useState } from "react";
import InmateCard from "../components/Inmates/InmateCard";
import Modal from "../components/ui/Modal";
import InmateDetails from "../components/Inmates/QuickInmateDetails";
import useInmates from "../hooks/useInmates";
import { useAuth } from "../context/AuthContext";
import { toastWarn } from "../utils/toast";
import { can } from "../utils/permissions";
import ResumeDraftsModal from "@/components/Inmates/ResumeDraftsModal";
import AdmitInmateStepper from "@/components/Inmates/AdmitInmateStepper";

const Inmates = () => {
  const { inmates, loading } = useInmates();
  const { role, user } = useAuth();

  const [selected, setSelected] = useState(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const [resumeDraftId, setResumeDraftId] = useState(null);
  const [openAdmit, setOpenAdmit] = useState(false);

  const handleView = (inmate) => {
    if (role === "intern") {
      toastWarn("No permission to view details");
      return;
    }
    setSelected(inmate);
  };

  if (loading) return <div>Loading inmates...</div>;

  return (
    <>
      {/* header */}
      <div className="flex justify-between mb-5">

        <input
          placeholder="Search inmates"
          className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg"
        />

        <div className="flex gap-3">
          {can(role,"admit") && (
            <button
              onClick={()=>setOpenAdmit(true)}
              className="px-4 py-2 bg-indigo-600 rounded-lg text-white">
              + Admit Inmate
            </button>
          )}

          <button
            onClick={()=>setShowDrafts(true)}
            className="text-indigo-400">
            Resume Draft
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-3 gap-6">
        {inmates.map(i=>(
          <InmateCard key={i.id} inmate={i} onView={handleView}/>
        ))}
      </div>

      {/* details */}
      <Modal open={!!selected} onClose={()=>setSelected(null)}>
        <InmateDetails inmate={selected}/>
      </Modal>

      {/* drafts */}
      <Modal open={showDrafts} onClose={() => setShowDrafts(false)}>
        <ResumeDraftsModal
          user={user}
          onClose={() => setShowDrafts(false)}
          onSelect={(id) => {
            setResumeDraftId(id);
            setShowDrafts(false);
            setOpenAdmit(true);
          }}
        />
      </Modal>

      {/* admit */}
      <Modal
        open={openAdmit}
        onClose={()=>setOpenAdmit(false)}
        closeOnOutsideClick={false}
      >
        <AdmitInmateStepper
          draftId={resumeDraftId}
          onClose={()=>{
            setOpenAdmit(false);
            setResumeDraftId(null);
          }}
        />
      </Modal>
    </>
  );
};

export default Inmates;
