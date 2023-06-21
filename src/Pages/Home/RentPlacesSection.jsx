import React, {useState, useEffect} from 'react'
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import ListingItem from '../../Components/ListingItem';

export default function RentPlacesSection() {

      const [rentListings, setRentListings] = useState(null);
     useEffect(() => {
       async function fetchListings() {
         try {
           // get reference
           const listingsRef = collection(db, "listings");
           // create the query
           const q = query(
             listingsRef,
             where("type", "==", "sale"),
             orderBy("timestamp", "desc"),
             limit(4)
           );           // execute the query
           const querySnap = await getDocs(q);
           const listings = [];
           querySnap.forEach((doc) => {
             return listings.push({
               id: doc.id,
               data: doc.data(),
             });
           });
           setSaleListings(listings);
         } catch (error) {
           console.log(error);
         }
       }
       fetchListings();
     }, []);
  return (
    <div>
      {rentListings && rentListings.length > 0 && (
        <div className="m-2 mb-6">
          <h2 className="px-3 text-2xl mt-6 font-semibold">Places for rent</h2>
          <Link to="/category/rent">
            <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Show more places for rent
            </p>
          </Link>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {rentListings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
