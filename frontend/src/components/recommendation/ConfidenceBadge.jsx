function ConfidenceBadge({ confidence }) {

    const colors = {
        High: "bg-blue-100 text-blue-700",
        Medium: "bg-orange-100 text-orange-700",
        Low: "bg-gray-100 text-gray-700"
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[confidence]}`}
        >
            {confidence}
        </span>
    );
}

export default ConfidenceBadge;