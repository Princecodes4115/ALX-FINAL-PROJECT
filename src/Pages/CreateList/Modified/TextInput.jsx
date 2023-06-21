export default function TextInput({
  type,
  id,
  value,
  onChange,
  placeholder,
  maxLength,
  minLength,
  required,
}) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      minLength={minLength}
      required={required}
      className="border border-gray-300 rounded-md px-2 py-1 w-full"
    />
  );
}