function Input({
  label,
  type = "text",
  ...props
}) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        {...props}
      />

    </div>
  );
}

export default Input;