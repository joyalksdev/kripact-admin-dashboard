import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const inmates = [
  {
    id: "INM-0231",
    name: "John Doe",
    age: 54,
    gender: "Male",
    status: "stable",
    ward: "Ward B",
    admittedOn: "2025-01-12",
    tags: ["Senior", "Psychiatric"],
    notes: "Under regular observation.",
    photoUrl: "",
  },
  {
    id: "INM-0232",
    name: "Mary Joseph",
    age: 67,
    gender: "Female",
    status: "critical",
    ward: "Ward A",
    admittedOn: "2024-11-05",
    tags: ["Senior"],
    notes: "Needs constant supervision.",
    photoUrl: "",
  },
];

export const seedInmates = async () => {
  for (const inmate of inmates) {
    await setDoc(doc(collection(db, "inmates"), inmate.id), {
      ...inmate,
      createdAt: serverTimestamp(),
    });
  }

  console.log("🔥 Dummy inmates added");
};
