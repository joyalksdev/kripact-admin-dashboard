import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ---------------- CREATE DRAFT ---------------- */

export const createDraft = async (user, formData) => {
  const ref = await addDoc(collection(db, "admissionDrafts"), {
    formData,
    step: 0,
    status: "draft",

    createdBy: user.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
};

/* ---------------- UPDATE DRAFT ---------------- */

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

/* ---------------- LOAD DRAFT ---------------- */

export const loadDraft = async (draftId) => {
  const snap = await getDoc(doc(db, "admissionDrafts", draftId));
  return snap.exists() ? snap.data() : null;
};

/* ---------------- DELETE DRAFT ---------------- */

export const deleteDraft = async (draftId) => {
  await deleteDoc(doc(db, "admissionDrafts", draftId));
};

/* ---------------- LIST MY DRAFTS ---------------- */

export const getMyDrafts = async (userId) => {
  const q = query(
    collection(db, "admissionDrafts"),
    where("createdBy", "==", userId),
    where("status", "==", "draft")
  );

  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
  }));
};
