import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

export const createListing = async (formData) => {
  const auth = getAuth();
  const { images } = formData;

  if (+formData.discountedPrice >= +formData.regularPrice) {
    throw new Error("Discounted price needs to be less than regular price");
  }

  if (images.length > 6) {
    throw new Error("Maximum 6 images are allowed");
  }

  let geolocation = {};
  let location;

  if (formData.latitude && formData.longitude) {
    location = {
      latitude: +formData.latitude,
      longitude: +formData.longitude,
    };
  }

  try {
    if (images.length) {
      const storage = getStorage();
      const listingImagesRef = ref(storage, "listing_images");
      const imageUrls = [];

      for (const image of images) {
        const imageRef = ref(listingImagesRef, `${uuidv4()}_${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }

      formData.images = imageUrls;
    }

    if (location) {
      const response = await addDoc(collection(db, "listings"), {
        ...formData,
        location,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      return { type: formData.type, id: response.id };
    }
  } catch (error) {
    throw new Error("Failed to create listing");
  }
};
