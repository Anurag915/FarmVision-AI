from flask import Blueprint, request, jsonify
import traceback

from src.recommendation.crop_recommendation import evaluate_all_crops

recommendation_bp = Blueprint(
    "recommendation",
    __name__,
    url_prefix="/api/recommendation"
)


@recommendation_bp.post("/predict")
def recommend_crops():

    try:

        # ---------------------------------------
        # Read Request
        # ---------------------------------------

        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "Request body must be valid JSON."
            }), 400

        # ---------------------------------------
        # Read Inputs
        # ---------------------------------------

        state = data.get("state")
        district = data.get("district")
        season = data.get("season")
        area = data.get("area")
        start_year = data.get("start_year")
        years = data.get("years")

        # ---------------------------------------
        # Validate Required Fields
        # ---------------------------------------

        required_fields = [
            state,
            district,
            season,
            area,
            start_year,
            years
        ]

        if any(value is None for value in required_fields):

            return jsonify({
                "status": "error",
                "message": "Missing required fields."
            }), 400

        # ---------------------------------------
        # Validate Data Types
        # ---------------------------------------

        try:

            area = float(area)
            start_year = int(start_year)
            years = int(years)

        except (TypeError, ValueError):

            return jsonify({
                "status": "error",
                "message": "area, start_year and years must be numeric."
            }), 400

        # ---------------------------------------
        # Generate Recommendations
        # ---------------------------------------

        recommendations = evaluate_all_crops(
            state=state,
            district=district,
            season=season,
            area=area,
            start_year=start_year,
            years=years
        )

        # ---------------------------------------
        # Check Empty Result
        # ---------------------------------------

        if recommendations.empty:

            return jsonify({
                "status": "error",
                "message": "No crop recommendations found."
            }), 404

        # ---------------------------------------
        # Keep Only Required Columns
        # ---------------------------------------

        recommendations = recommendations[
            [
                "Rank",
                "Crop",
                "Recommendation_Score",
                "Average_Revenue",
                "Average_Price",
                "Average_Production",
                "Predicted_Yield",
                "Confidence",
                "Risk",
                "Yield_Warning",
                "Explanation"
            ]
        ]

        # ---------------------------------------
        # Return Response
        # ---------------------------------------

        return jsonify({

            "status": "success",

            "input": {

                "state": state,
                "district": district,
                "season": season,
                "area": area,
                "start_year": start_year,
                "years": years

            },

            "total_recommendations": len(recommendations),

            "recommendations": recommendations.to_dict(
                orient="records"
            )

        }), 200

    except Exception as e:

        traceback.print_exc()

        return jsonify({

            "status": "error",
            "message": str(e)

        }), 500