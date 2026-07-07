from flask import Blueprint
from flask import jsonify
from flask import request

from src.metadata.metadata_service import (
    get_states,
    get_districts,
    get_seasons,
    get_price_crops,
    get_recommendation_crops,
    get_all_metadata
)

metadata_bp = Blueprint(
    "metadata",
    __name__,
    url_prefix="/api/metadata"
)


# ------------------------------------
# Get All States
# ------------------------------------

@metadata_bp.get("/states")
def states():

    return jsonify({

        "status": "success",

        "states": get_states()

    })


# ------------------------------------
# Get Districts
# ------------------------------------

@metadata_bp.get("/districts")
def districts():

    state = request.args.get("state")

    return jsonify({

        "status": "success",

        "districts": get_districts(state)

    })


# ------------------------------------
# Get Seasons
# ------------------------------------

@metadata_bp.get("/seasons")
def seasons():

    state = request.args.get("state")
    district = request.args.get("district")

    return jsonify({

        "status": "success",

        "seasons": get_seasons(
            state,
            district
        )

    })


# ------------------------------------
# Recommendation Crops
# ------------------------------------

@metadata_bp.get("/recommendation/crops")
def recommendation_crops():

    state = request.args.get("state")
    district = request.args.get("district")
    season = request.args.get("season")

    return jsonify({

        "status": "success",

        "crops": get_recommendation_crops(
            state,
            district,
            season
        )

    })


# ------------------------------------
# Price Forecast Crops
# ------------------------------------

@metadata_bp.get("/price/crops")
def price_crops():

    state = request.args.get("state")

    return jsonify({

        "status": "success",

        "crops": get_price_crops(state)

    })

@metadata_bp.get("/all")
def metadata():

    return jsonify({

        "status": "success",

        "metadata": get_all_metadata()

    })