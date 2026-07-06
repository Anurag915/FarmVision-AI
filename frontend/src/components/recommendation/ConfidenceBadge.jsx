function ConfidenceBadge({ confidence }) {

    const colors = {
        High: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10",
        Medium: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
        Low: "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10"
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[confidence]}`}
        >
            {confidence}
        </span>
    );
}

export default ConfidenceBadge;