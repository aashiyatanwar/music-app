import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 1, name: "Folk", value: "folk" },
  { id: 2, name: "Pop", value: "Pop" },
  { id: 3, name: "Rock", value: "rock" },
  { id: 4, name: "Hip Hop", value: "hip-hop" },
  { id: 5, name: "Soul", value: "soul" },
];

export const filterByLanguage = [
  { id: 1, name: "English", value: "english" },
  { id: 2, name: "Hindi", value: "hindi" },
  { id: 3, name: "Punjabi", value: "punjabi" },
  { id: 4, name: "Telugu", value: "Telugu" },
  { id: 5, name: "Tamil", value: "Tamil" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

