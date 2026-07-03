def normalize(
    value,
    min_value,
    max_value
):

    if max_value == min_value:
        return 1.0

    return (value - min_value) / (max_value - min_value)



def inverse_normalize(
    value,
    min_value,
    max_value
):

    if max_value == min_value:
        return 1.0

    return 1 - (
        (value - min_value)
        /
        (max_value - min_value)
    )


def calculate_recommendation_score(
    row,
    score_limits
):

    revenue_score = normalize(
        row["Average_Revenue"],
        score_limits["Revenue_Min"],
        score_limits["Revenue_Max"]
    )

    years_score = normalize(
        row["Years_Grown"],
        score_limits["Years_Min"],
        score_limits["Years_Max"]
    )

    production_stability_score = inverse_normalize(
        row["Production_CV"],
        score_limits["ProductionCV_Min"],
        score_limits["ProductionCV_Max"]
    )

    price_stability_score = inverse_normalize(
        row["Price_CV"],
        score_limits["PriceCV_Min"],
        score_limits["PriceCV_Max"]
    )

    # Placeholder until we build a proper climate score
    climate_score = 1.0

    recommendation_score = (

        0.35 * revenue_score +

        0.25 * years_score +

        0.20 * production_stability_score +

        0.10 * price_stability_score +

        0.10 * climate_score

    ) * 100

    return recommendation_score

def calculate_confidence(row):

    if row["Years_Grown"] >= years_high:
        return "High"

    elif row["Years_Grown"] >= years_medium:
        return "Medium"

    return "Low"

def calculate_risk(row):

    risk = (
        row["Production_CV"] * 0.6 +
        row["Price_CV"] * 0.4
    )

    if risk <= low_risk:
        return "Low"

    elif risk <= high_risk:
        return "Medium"

    return "High"


def generate_explanation(row):

    reasons = []

    if row["Confidence"] == "High":
        reasons.append("long cultivation history")

    if row["Risk"] == "Low":
        reasons.append("stable price and production")

    if row["Yield_Warning"]:
        reasons.append(
            "predicted yield is higher than historical observations"
        )

    reasons.append(
        f"expected revenue ₹{row['Average_Revenue']:,.0f}"
    )

    return (
        f"{row['Crop']} is recommended because "
        + ", ".join(reasons)
        + "."
    )
