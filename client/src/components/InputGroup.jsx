export default function InputGroup({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs font-pixel text-[#aaaaaa8a] uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 font-inter  bg-bg border border-[#1b1b1b] text-secondary placeholder:text-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
