import traceback

from flask import Blueprint, request, jsonify

from src.recommendation.crop_recommendation import get_price_weather
from src.forecasting.price_forecast import forecast_prices

price_bp = Blueprint(
    "price",
    __name__,
    url_prefix="/api/price"
)


@price_bp.post("/predict")
def predict_price():

    try:

        data = request.get_json()

        state = data.get("state")
        crop = data.get("crop")
        start_year = data.get("start_year")
        start_month = data.get("start_month")
        months = data.get("months")

        # Basic Validation
        if None in [state, crop, start_year, start_month, months]:
            return jsonify({
                "status": "error",
                "message": "Missing required fields."
            }), 400

        # Weather
        weather = get_price_weather(
            state=state,
            crop=crop,
            start_year=start_year,
            start_month=start_month,
            months=months
        )

        # Forecast
        forecast, _ = forecast_prices(
            state=state,
            crop=crop,
            start_year=start_year,
            start_month=start_month,
            months=months,
            weather_data=weather
        )

        return jsonify({

            "status": "success",

            "input":{

                "state":state,

                "crop":crop,

                "start_year":start_year,

                "start_month":start_month,

                "months":months

            },

            "total_predictions":len(forecast),

            "forecast":forecast.to_dict(
                orient="records"
            )

        })


    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500