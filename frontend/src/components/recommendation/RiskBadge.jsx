function RiskBadge({ risk }) {

    const colors = {
        Low: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
        Medium: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
        High: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[risk]}`}
        >
            {risk}
        </span>
    );
}

export default RiskBadge;