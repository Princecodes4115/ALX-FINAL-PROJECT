export default function TextArea({
  id,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border border-gray-300 rounded-md px-2 py-1 w-full"
    ></textarea>
  );
}
