export default function Button({ type, id, value, onClick, classNames }) {
  return (
    <button
      type={type}
      id={id}
      className={`bg-gray-900 text-white px-4 py-2 rounded-md ${classNames}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
