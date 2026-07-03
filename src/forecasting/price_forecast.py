import warnings
warnings.filterwarnings("ignore")

import joblib
import numpy as np
import pandas as pd

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# price = pd.read_csv(
#     ROOT / "datasets" / "modeling" / "price_features.csv"
# )

# price_model = joblib.load(
#     ROOT / "models" / "catboost_price_model.pkl"
# )

from src.data.data_loader import (
    price,
    price_model
)

def get_price_history(state, crop):

    history = (
        price[
            (price["State"] == state) &
            (price["Standard_Crop"] == crop)
        ]
        .sort_values(["Year", "Month"])
        .reset_index(drop=True)
        .copy()
    )

    if history.empty:
        raise ValueError(
            f"No historical data found for {crop} in {state}"
        )

    return history



def prepare_price_features(
    history,
    year,
    month,
    temperature,
    dew_point,
    rainfall,
    wind_speed,
    pressure
):

    last = history.iloc[-1]

    features = {
        "State": last["State"],
        "Year": year,
        "Month": month,
        "Standard_Crop": last["Standard_Crop"],

        "Market_Records": last["Market_Records"],
        "Unique_Markets": last["Unique_Markets"],

        "Avg_Temperature_C": temperature,
        "Avg_DewPoint_C": dew_point,
        "Avg_Rainfall_mm": rainfall,
        "Avg_Wind_Speed": wind_speed,
        "Avg_Surface_Pressure_hPa": pressure,

        "Grid_Points": last["Grid_Points"],

        "Price_Lag_1": last["Price_Lag_1"],
        "Price_Lag_2": last["Price_Lag_2"],
        "Price_Lag_3": last["Price_Lag_3"],

        "Rolling_Mean_3": last["Rolling_Mean_3"],
        "Rolling_Mean_6": last["Rolling_Mean_6"],
        "Rolling_STD_3": last["Rolling_STD_3"],

        "Quarter": (month - 1) // 3 + 1,

        "Month_Sin": np.sin(2 * np.pi * month / 12),
        "Month_Cos": np.cos(2 * np.pi * month / 12),

        "Previous_Change": last["Previous_Change"],
        "Previous_Growth": last["Previous_Growth"],

        "Temp_Rainfall": temperature * rainfall,
        "Temp_DewPoint": temperature * dew_point,
        "Rainfall_Wind": rainfall * wind_speed,
    }

    features = pd.DataFrame([features])

    return features[price_model.feature_names_]


def predict_next_price(features):

    log_price = price_model.predict(features)[0]

    actual_price = np.expm1(log_price)

    return log_price, actual_price


def update_price_history(
    history,
    predicted_log_price,
    year,
    month,
    temperature,
    dew_point,
    rainfall,
    wind_speed,
    pressure
):

    last = history.iloc[-1].copy()

    new_row = last.copy()

    # -----------------------------
    # Update time
    # -----------------------------
    new_row["Year"] = year
    new_row["Month"] = month
    new_row["Quarter"] = (month - 1) // 3 + 1

    new_row["Month_Sin"] = np.sin(2 * np.pi * month / 12)
    new_row["Month_Cos"] = np.cos(2 * np.pi * month / 12)

    # -----------------------------
    # Predicted price
    # -----------------------------
    new_row["Log_Price"] = predicted_log_price
    new_row["Avg_Modal_Price"] = np.expm1(predicted_log_price)

    # -----------------------------
    # Shift lag features
    # -----------------------------
    new_row["Price_Lag_3"] = last["Price_Lag_2"]
    new_row["Price_Lag_2"] = last["Price_Lag_1"]
    new_row["Price_Lag_1"] = predicted_log_price

    # -----------------------------
    # Weather
    # -----------------------------
    new_row["Avg_Temperature_C"] = temperature
    new_row["Avg_DewPoint_C"] = dew_point
    new_row["Avg_Rainfall_mm"] = rainfall
    new_row["Avg_Wind_Speed"] = wind_speed
    new_row["Avg_Surface_Pressure_hPa"] = pressure

    # -----------------------------
    # Interaction features
    # -----------------------------
    new_row["Temp_Rainfall"] = temperature * rainfall
    new_row["Temp_DewPoint"] = temperature * dew_point
    new_row["Rainfall_Wind"] = rainfall * wind_speed

    # -----------------------------
    # Append row
    # -----------------------------
    history = pd.concat(
        [history, pd.DataFrame([new_row])],
        ignore_index=True
    )

    # -----------------------------
    # Recompute rolling features
    # -----------------------------
    logs = history["Log_Price"]

    history.loc[
        history.index[-1],
        "Rolling_Mean_3"
    ] = logs.iloc[-3:].mean()

    history.loc[
        history.index[-1],
        "Rolling_Mean_6"
    ] = logs.iloc[-6:].mean()

    history.loc[
        history.index[-1],
        "Rolling_STD_3"
    ] = logs.iloc[-3:].std()

    # -----------------------------
    # Previous Change
    # -----------------------------
    history.loc[
        history.index[-1],
        "Previous_Change"
    ] = (
        predicted_log_price -
        last["Log_Price"]
    )

    # -----------------------------
    # Previous Growth
    # -----------------------------
    history.loc[
        history.index[-1],
        "Previous_Growth"
    ] = (
        history.iloc[-1]["Previous_Change"] /
        last["Log_Price"]
    )

    return history




def forecast_prices(
    state,
    crop,
    start_year,
    start_month,
    months,
    weather_data
):

    history = get_price_history(state, crop)

    forecasts = []

    year = start_year
    month = start_month

    for i in range(months):

        weather = weather_data.iloc[i]

        features = prepare_price_features(
            history=history,
            year=year,
            month=month,
            temperature=weather["Avg_Temperature_C"],
            dew_point=weather["Avg_DewPoint_C"],
            rainfall=weather["Avg_Rainfall_mm"],
            wind_speed=weather["Avg_Wind_Speed"],
            pressure=weather["Avg_Surface_Pressure_hPa"]
        )

        log_price, predicted_price = predict_next_price(features)

        forecasts.append({
            "State": state,
            "Crop": crop,
            "Year": year,
            "Month": month,
            "Predicted_Log_Price": log_price,
            "Predicted_Price": predicted_price
        })

        history = update_price_history(
            history,
            predicted_log_price=log_price,
            year=year,
            month=month,
            temperature=weather["Avg_Temperature_C"],
            dew_point=weather["Avg_DewPoint_C"],
            rainfall=weather["Avg_Rainfall_mm"],
            wind_speed=weather["Avg_Wind_Speed"],
            pressure=weather["Avg_Surface_Pressure_hPa"]
        )

        month += 1

        if month > 12:
            month = 1
            year += 1

    return pd.DataFrame(forecasts), history