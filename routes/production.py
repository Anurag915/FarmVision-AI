from flask import Blueprint, request, jsonify

from src.recommendation.crop_recommendation import get_production_weather
from src.forecasting.production_forecast import forecast_production

production_bp = Blueprint(
    "production",
    __name__,
    url_prefix="/api/production"
)


@production_bp.post("/predict")
def predict_production():

    try:

        data = request.get_json()

        state = data.get("state")
        district = data.get("district")
        crop = data.get("crop")
        season = data.get("season")
        area = data.get("area")
        start_year = data.get("start_year")
        years = data.get("years")

        # -----------------------------
        # Validation
        # -----------------------------
        if None in [
            state,
            district,
            crop,
            season,
            area,
            start_year,
            years
        ]:

            return jsonify({
                "status": "error",
                "message": "Missing required fields."
            }), 400

        # -----------------------------
        # Generate Weather
        # -----------------------------
        weather = get_production_weather(
            state=state,
            district=district,
            crop=crop,
            season=season,
            start_year=start_year,
            years=years
        )

        # -----------------------------
        # Forecast Production
        # -----------------------------
        forecast, _ = forecast_production(
            state=state,
            district=district,
            crop=crop,
            season=season,
            area=area,
            start_year=start_year,
            years=years,
            weather_data=weather
        )

        return jsonify({

            "status": "success",

            "input": {

                "state": state,
                "district": district,
                "crop": crop,
                "season": season,
                "area": area,
                "start_year": start_year,
                "years": years

            },

            "total_predictions": len(forecast),

            "forecast": forecast.to_dict(
                orient="records"
            )

        })

    except Exception as e:

        return jsonify({

            "status": "error",
            "message": str(e)

        }), 500