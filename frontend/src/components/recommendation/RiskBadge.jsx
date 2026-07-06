function RiskBadge({ risk }) {

    const colors = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700"
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[risk]}`}
        >
            {risk}
        </span>
    );
}

export default RiskBadge;