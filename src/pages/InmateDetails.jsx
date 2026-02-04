import { useParams } from "react-router-dom";
import useInmate from "@/hooks/useInmate";

import InmateHeader from "@/components/inmates/InmateHeader";
import AdmissionInfo from "@/components/inmates/AdmissionInfo";
import MedicalInfo from "@/components/inmates/MedicalInfo";
import InmateDocuments from "@/components/inmates/InmateDocuments";

const InmateDetails = () => {
  const { inmateId } = useParams();
  const { inmate, loading } = useInmate(inmateId);

  if (loading) return <div>Loading inmate...</div>;
  if (!inmate) return <div>Inmate not found</div>;

  return (
    <div className="space-y-8">
      <InmateHeader inmate={inmate} />

      <div className="grid grid-cols-2 gap-6">
        <AdmissionInfo admission={inmate.admission} />
        <MedicalInfo medical={inmate.medical} />
      </div>

      <InmateDocuments documents={inmate.documents} />
    </div>
  );
};

export default InmateDetails;
