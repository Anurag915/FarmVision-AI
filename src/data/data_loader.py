import warnings
warnings.filterwarnings("ignore")

import joblib
import numpy as np
import pandas as pd

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
# print(ROOT)

price = pd.read_csv(
    ROOT / "datasets" / "modeling" / "price_features.csv"
)

price_model = joblib.load(
    ROOT / "models" / "catboost_price_model.pkl"
)

production = pd.read_csv(
    ROOT / "datasets" / "processed" / "production_features.csv"
)

production_model = joblib.load(
    ROOT / "models" / "catboost_production.pkl"
)


# monthly_weather = pd.read_csv(
#     ROOT / "datasets" / "processed" / "state_monthly_weather.csv"
# )

