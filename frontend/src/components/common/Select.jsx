function Select({
  label,
  options,
  ...props
}) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}

export default Select;