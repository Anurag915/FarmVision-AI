import warnings
warnings.filterwarnings("ignore")

import joblib
import numpy as np
import pandas as pd

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

production = pd.read_csv(
    ROOT / "datasets" / "processed" / "production_features.csv"
)

production_model = joblib.load(
    ROOT / "models" / "catboost_production.pkl"
)

def get_production_history(
    state,
    district,
    crop,
    season
):

    history = (
        production[
            (production["State"] == state) &
            (production["District_Name"] == district) &
            (production["Crop"] == crop) &
            (production["Season"] == season)
        ]
        .sort_values("Year")
        .reset_index(drop=True)
        .copy()
    )

    if history.empty:
        raise ValueError(
            f"No historical data found for {crop} in {district}, {state}"
        )

    return history


def prepare_production_features(
    history,
    year,
    area,
    temperature,
    dew_point,
    rainfall,
    wind_speed,
    pressure
):

    last = history.iloc[-1]

    features = {
        "State": last["State"],
        "District_Name": last["District_Name"],
        "Year": year,
        "Season": last["Season"],
        "Crop": last["Crop"],

        # User Input
        "Area": area,

        # Weather
        "Avg_Annual_Temperature": temperature,
        "Avg_Annual_DewPoint": dew_point,
        "Total_Annual_Rainfall": rainfall,
        "Avg_Annual_Wind_Speed": wind_speed,
        "Avg_Annual_Surface_Pressure": pressure,

        "Avg_Grid_Points": last["Avg_Grid_Points"],

        # Engineered Features
        "Log_Area": np.log1p(area),

        "Production_Lag_1": last["Production_Lag_1"],
        "Production_Lag_2": last["Production_Lag_2"],
        "Production_Lag_3": last["Production_Lag_3"],

        "Rolling_Mean_3": last["Rolling_Mean_3"],
        "Rolling_Mean_5": last["Rolling_Mean_5"],
        "Rolling_STD_3": last["Rolling_STD_3"],

        "Previous_Change": last["Previous_Change"],
        "Previous_Growth": last["Previous_Growth"],

        "Years_From_Start": year - history["Year"].min(),

        "Year_Squared": (year - history["Year"].min()) ** 2,

        "Temp_Rainfall": temperature * rainfall,
        "Temp_DewPoint": temperature * dew_point,
        "Rainfall_Wind": rainfall * wind_speed,

        "Area_Rainfall": area * rainfall,
        "Area_Temperature": area * temperature,
    }

    features = pd.DataFrame([features])

    return features[production_model.feature_names_]


def predict_next_production(features):

    predicted_log_production = production_model.predict(features)[0]

    predicted_production = np.expm1(predicted_log_production)

    return predicted_log_production, predicted_production


def update_production_history(
    history,
    predicted_log_production,
    year,
    area,
    temperature,
    dew_point,
    rainfall,
    wind_speed,
    pressure
):

    last = history.iloc[-1].copy()
    new_row = last.copy()

    # ----------------------------------
    # Time
    # ----------------------------------
    new_row["Year"] = year

    # ----------------------------------
    # User Input
    # ----------------------------------
    new_row["Area"] = area
    new_row["Log_Area"] = np.log1p(area)

    # ----------------------------------
    # Predicted Production
    # ----------------------------------
    new_row["Log_Production"] = predicted_log_production
    new_row["Production"] = np.expm1(predicted_log_production)

    # ----------------------------------
    # Lag Features
    # ----------------------------------
    new_row["Production_Lag_3"] = last["Production_Lag_2"]
    new_row["Production_Lag_2"] = last["Production_Lag_1"]
    new_row["Production_Lag_1"] = predicted_log_production

    # ----------------------------------
    # Weather
    # ----------------------------------
    new_row["Avg_Annual_Temperature"] = temperature
    new_row["Avg_Annual_DewPoint"] = dew_point
    new_row["Total_Annual_Rainfall"] = rainfall
    new_row["Avg_Annual_Wind_Speed"] = wind_speed
    new_row["Avg_Annual_Surface_Pressure"] = pressure

    # ----------------------------------
    # Time Features
    # ----------------------------------
    start_year = history["Year"].min()

    new_row["Years_From_Start"] = year - start_year
    new_row["Year_Squared"] = (year - start_year) ** 2

    # ----------------------------------
    # Interaction Features
    # ----------------------------------
    new_row["Temp_Rainfall"] = temperature * rainfall
    new_row["Temp_DewPoint"] = temperature * dew_point
    new_row["Rainfall_Wind"] = rainfall * wind_speed

    new_row["Area_Rainfall"] = area * rainfall
    new_row["Area_Temperature"] = area * temperature

    # ----------------------------------
    # Append New Row
    # ----------------------------------
    history = pd.concat(
        [history, pd.DataFrame([new_row])],
        ignore_index=True
    )

    # ----------------------------------
    # Rolling Features
    # ----------------------------------
    log_productions = history["Log_Production"]

    history.loc[
        history.index[-1],
        "Rolling_Mean_3"
    ] = log_productions.iloc[-3:].mean()

    history.loc[
        history.index[-1],
        "Rolling_Mean_5"
    ] = log_productions.iloc[-5:].mean()

    history.loc[
        history.index[-1],
        "Rolling_STD_3"
    ] = log_productions.iloc[-3:].std()

    # ----------------------------------
    # Previous Change
    # ----------------------------------
    previous_change = (
        predicted_log_production -
        last["Log_Production"]
    )

    history.loc[
        history.index[-1],
        "Previous_Change"
    ] = previous_change

    # ----------------------------------
    # Previous Growth
    # ----------------------------------
    if last["Log_Production"] != 0:
        history.loc[
            history.index[-1],
            "Previous_Growth"
        ] = (
            previous_change /
            last["Log_Production"]
        )
    else:
        history.loc[
            history.index[-1],
            "Previous_Growth"
        ] = 0

    return history


def forecast_production(
    state,
    district,
    crop,
    season,
    area,
    start_year,
    years,
    weather_data
):

    if len(weather_data) < years:
        raise ValueError(
            f"Weather data contains {len(weather_data)} rows but {years} forecast years were requested."
        )

    history = get_production_history(
        state,
        district,
        crop,
        season
    )

    forecasts = []

    year = start_year

    for i in range(years):

        weather = weather_data.iloc[i]

        features = prepare_production_features(
            history=history,
            year=year,
            area=area,
            temperature=weather["Avg_Annual_Temperature"],
            dew_point=weather["Avg_Annual_DewPoint"],
            rainfall=weather["Total_Annual_Rainfall"],
            wind_speed=weather["Avg_Annual_Wind_Speed"],
            pressure=weather["Avg_Annual_Surface_Pressure"]
        )

        predicted_log_production, predicted_production = predict_next_production(
            features
        )

        forecasts.append({

            "Forecast_Year": i + 1,

            "State": state,

            "District": district,

            "Crop": crop,

            "Season": season,

            "Year": year,

            "Area": area,

            "Predicted_Log_Production": predicted_log_production,

            "Predicted_Production": predicted_production

        })

        history = update_production_history(
            history=history,
            predicted_log_production=predicted_log_production,
            year=year,
            area=area,
            temperature=weather["Avg_Annual_Temperature"],
            dew_point=weather["Avg_Annual_DewPoint"],
            rainfall=weather["Total_Annual_Rainfall"],
            wind_speed=weather["Avg_Annual_Wind_Speed"],
            pressure=weather["Avg_Annual_Surface_Pressure"]
        )

        year += 1

    return pd.DataFrame(forecasts), history