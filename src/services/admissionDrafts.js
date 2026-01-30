import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* CREATE DRAFT */
export const createDraft = async (user, form = {}) => {
  const ref = await addDoc(collection(db, "admissionDrafts"), {
    formData: form,
    step: 0,
    status: "draft",
    createdBy: user.uid,
    role: user.role,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

/* UPDATE DRAFT */
export const updateDraft = async (draftId, data) => {
  const ref = doc(db, "admissionDrafts", draftId);
  await setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

/* LOAD DRAFT */
export const loadDraft = async (draftId) => {
  const snap = await getDoc(doc(db, "admissionDrafts", draftId));
  return snap.exists() ? snap.data() : null;
};
