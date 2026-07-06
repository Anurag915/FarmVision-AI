from flask import Flask
from flask_cors import CORS

from routes import (
    price_bp,
    production_bp,
    recommendation_bp
)

app = Flask(__name__)
CORS(app)

app.register_blueprint(price_bp)
app.register_blueprint(production_bp)
app.register_blueprint(recommendation_bp)


@app.get("/")
def home():

    return {
        "status": "success",
        "message": "AI Agriculture Decision Support System API"
    }


if __name__ == "__main__":
    app.run(debug=True)