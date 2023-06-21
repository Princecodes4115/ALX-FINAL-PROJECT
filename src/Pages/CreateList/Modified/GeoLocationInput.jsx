export default function GeolocationInput({ latitude, longitude, onChange }) {
  return (
    <>
      <label htmlFor="latitude" className="block mt-4 font-medium">
        Latitude:
      </label>
      <input
        type="number"
        id="latitude"
        value={latitude}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-2 py-1 w-full"
      />

      <label htmlFor="longitude" className="block mt-4 font-medium">
        Longitude:
      </label>
      <input
        type="number"
        id="longitude"
        value={longitude}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-2 py-1 w-full"
      />
    </>
  );
}
