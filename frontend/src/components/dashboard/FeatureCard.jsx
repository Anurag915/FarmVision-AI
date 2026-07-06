function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-500">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;