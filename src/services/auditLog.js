import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const logAudit = async ({
  action,
  entity,
  entityId,
  performedBy,
  role,
  before = null,
  after = null,
}) => {
  await addDoc(collection(db, "auditLogs"), {
    action,
    entity,
    entityId,
    performedBy,
    role,
    changes: { before, after },
    createdAt: serverTimestamp(),
  });
};







