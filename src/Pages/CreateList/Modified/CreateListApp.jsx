import React, { useState } from "react";
import ListingForm from "./ListingForm";
import Spinner from "../../Components/Spinner";
import Button from "./Button";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
// import ErrorMessage from "./components/ErrorMessage";
// import SuccessMessage from "./components/SuccessMessage";
import GeolocationInput from "./GeoLocationInput";

export default function CreateListApp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // initial form data
    // ...
  });
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simulate an asynchronous operation (e.g., API call) with setTimeout
    setTimeout(() => {
      // Perform your logic here to handle the form submission
      // ...

      // Example: Reset form data and show success message
      setFormData({
        // Reset form data
        // ...
      });
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLocationChange = (event) => {
    const { id, value } = event.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [id]: value,
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-2">Listing Form</h1>

      {loading && <Spinner />}

      {/* {error && <ErrorMessage message={error} />}

      {success && <SuccessMessage message="Listing created successfully!" />} */}

      <ListingForm onSubmit={handleFormSubmit}>
        <TextInput
          type="text"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />

        <TextArea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />

        <GeolocationInput
          latitude={location.latitude}
          longitude={location.longitude}
          onChange={handleLocationChange}
        />

        {/* Render other form inputs and components as needed */}

        <Button type="submit" value="Submit" classNames="mt-4" />
      </ListingForm>
    </div>
  );
}
