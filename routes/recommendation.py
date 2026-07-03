from flask import Blueprint

recommendation_bp = Blueprint(
    "recommendation",
    __name__,
    url_prefix="/api/recommendation"
)