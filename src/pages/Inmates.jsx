import { useState } from "react";
import InmateCard from "../components/Inmates/InmateCard";
import Modal from "../components/ui/Modal";
import InmateDetails from "./InmateDetails";
import useInmates from "../hooks/useInmates";
import { seedInmates } from "../scripts/seedInmates";

const Inmates = () => {
  const { inmates, loading } = useInmates();
  const [selected, setSelected] = useState(null);

  if (loading) {
    return <div className="text-neutral-400">Loading inmates...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inmates.map(inmate => (
          <InmateCard
            key={inmate.id}
            inmate={inmate}
            onView={setSelected}
          />
        ))}
      </div>


      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <InmateDetails inmate={selected} />
      </Modal>
    </>
  );
};

export default Inmates;
