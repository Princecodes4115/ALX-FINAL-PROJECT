import React, {useState, useEffect} from 'react'
import ListingItem from "../../Components/ListingItem";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyListing() {
      const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
      const auth = getAuth();
    const navigate = useNavigate()
    
     useEffect(() => {
       async function fetchUserListings() {
         const listingRef = collection(db, "listings");
         const q = query(
           listingRef,
           where("userRef", "==", auth.currentUser.uid),
           orderBy("timestamp", "desc")
         );
         const querySnap = await getDocs(q);
         let listings = [];
         querySnap.forEach((doc) => {
           return listings.push({
             id: doc.id,
             data: doc.data(),
           });
         });
         setListings(listings);
         setLoading(false);
       }
       fetchUserListings();
     }, [auth.currentUser.uid]);
     async function onDelete(listingID) {
       if (window.confirm("Are you sure you want to delete?")) {
         await deleteDoc(doc(db, "listings", listingID));
         const updatedListings = listings.filter(
           (listing) => listing.id !== listingID
         );
         setListings(updatedListings);
         toast.success("Successfully deleted the listing");
       }
     }
     function onEdit(listingID) {
       navigate(`/edit-listing/${listingID}`);
     }
  return (
    <React.Fragment>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
