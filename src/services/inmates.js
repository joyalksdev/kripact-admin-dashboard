import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const createInmate = async (data) => {
  const ref = await addDoc(collection(db, "inmates"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return ref.id;
};
