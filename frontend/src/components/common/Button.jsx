function Button({
  children,
  loading,
  ...props
}) {
  return (
    <button
      className="w-full rounded-xl bg-green-600 text-white py-3 font-semibold hover:bg-green-700 transition disabled:opacity-60"
      disabled={loading}
      {...props}
    >
      {loading ? "Predicting..." : children}
    </button>
  );
}

export default Button;