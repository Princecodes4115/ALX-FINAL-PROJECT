/* eslint-disable default-case */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

export default function UploadImage() {
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    const fileList = e.target.files;
    const imageList = [...fileList];
    setImages(imageList);
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const auth = getAuth();
      const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const uploadImages = async () => {
    try {
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      );
      console.log(imgUrls);
      // Pass imgUrls to another component or perform other actions
    } catch (error) {
      console.log("Error uploading images:", error);
      throw new Error("Failed to upload images");
      }
    };
    

  return (
    <React.Fragment>
      <div className="mb-6">
        <p className="text-lg font-semibold">Images</p>
        <p className="text-gray-600">
          The first image will be the cover (max 6)
        </p>
        <input
          type="file"
          id="images"
          onChange={onChange}
          accept=".jpg,.png,.jpeg"
          multiple
          required
          className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
        />
      </div>
      <button onClick={uploadImages}>Upload Images</button>
    </React.Fragment>
  );
}
