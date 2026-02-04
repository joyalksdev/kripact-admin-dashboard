import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export const uploadInmatePhoto = async (file, uid) => {
  if (!file || !uid) {
    throw new Error("Missing file or uid");
  }

  const safeName = file.name.replace(/[^\w.-]+/g, "_");

  const photoRef = ref(
    storage,
    `inmates/${uid}/${Date.now()}-${safeName}`
  );

  await uploadBytes(photoRef, file);
  return await getDownloadURL(photoRef);
};
