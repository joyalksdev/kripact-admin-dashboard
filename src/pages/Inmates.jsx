import { useState } from "react";
import InmateCard from "../components/Inmates/InmateCard";
import Modal from "../components/ui/Modal";
import InmateDetails from "./InmateDetails";
import useInmates from "../hooks/useInmates";
import { useAuth } from "../context/AuthContext";
import { seedInmates } from "../scripts/seedInmates";
import { toastWarn } from "../utils/toast"; 
import { can } from "../utils/permissions";
import AdmitInmateForm from "../components/Inmates/AdmitInmateForm";

const Inmates = () => {
  const { inmates, loading } = useInmates();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const { role } = useAuth();



  const handleView = (inmate) => {
  if (role === "intern") {
    toastWarn("You don’t have permission to view inmate details");
    return;
  }
  setSelected(inmate);
};

console.log("ROLE:", role);

  if (loading) {
    return <div className="text-neutral-400">Loading inmates...</div>;
  }

  return (
    <>

    <div className="flex justify-between mb-5">
       <div className='flex py-2 px-3 border border-neutral-700 rounded-lg'>
        <input type="text" placeholder='Search Inmates' className='outline-none'/>
       </div>

      {can(role, "admit") && (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Admit Inmate
        </button>
      )}
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inmates.map(inmate => (
          <InmateCard
            key={inmate.id}
            inmate={inmate}
            onView={handleView}
          />
        ))}
      </div>


      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <InmateDetails inmate={selected} />
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <AdmitInmateForm onClose={() => setOpen(false)} />
      </Modal>

    </>
  );
};

export default Inmates;
