import pandas as pd
import numpy as np

from src.forecasting.price_forecast import forecast_prices

from src.forecasting.production_forecast import forecast_production

from src.recommendation.scoring import (
    calculate_recommendation_score,
    calculate_confidence,
    calculate_risk,
    generate_explanation
)

from src.data.data_loader import (
    price,
    production,
    monthly_weather
)


def get_candidate_crops(
    state,
    district,
    season
):

    candidate_crops = (

        production[
            (production["State"] == state)
            &
            (production["District_Name"] == district)
            &
            (production["Season"] == season)
        ]

        ["Crop"]

        .dropna()

        .unique()

    )

    return sorted(candidate_crops)


def get_price_weather(
    state,
    crop,
    start_year,
    start_month,
    months
):

    history = price[
        (price["State"] == state) &
        (price["Standard_Crop"] == crop)
    ].copy()

    if history.empty:
        raise ValueError(
            f"No price history found for {crop} in {state}"
        )

    # Average weather for each month
    monthly_weather = (
        history.groupby("Month")[
            [
                "Avg_Temperature_C",
                "Avg_DewPoint_C",
                "Avg_Rainfall_mm",
                "Avg_Wind_Speed",
                "Avg_Surface_Pressure_hPa"
            ]
        ]
        .mean()
        .reset_index()
    )

    weather_rows = []

    year = start_year
    month = start_month

    for _ in range(months):

        row = monthly_weather[
            monthly_weather["Month"] == month
        ].iloc[0]

        weather_rows.append({
            "Avg_Temperature_C": row["Avg_Temperature_C"],
            "Avg_DewPoint_C": row["Avg_DewPoint_C"],
            "Avg_Rainfall_mm": row["Avg_Rainfall_mm"],
            "Avg_Wind_Speed": row["Avg_Wind_Speed"],
            "Avg_Surface_Pressure_hPa": row["Avg_Surface_Pressure_hPa"]
        })

        month += 1

        if month == 13:
            month = 1
            year += 1

    return pd.DataFrame(weather_rows)

def get_production_weather(
    state,
    district,
    crop,
    season,
    start_year,
    years
):

    history = production[
        (production["State"] == state) &
        (production["District_Name"] == district) &
        (production["Crop"] == crop) &
        (production["Season"] == season)
    ].copy()

    if history.empty:
        raise ValueError(
            f"No production history found for {crop}"
        )

    avg_weather = {
        "Avg_Annual_Temperature":
            history["Avg_Annual_Temperature"].mean(),

        "Avg_Annual_DewPoint":
            history["Avg_Annual_DewPoint"].mean(),

        "Total_Annual_Rainfall":
            history["Total_Annual_Rainfall"].mean(),

        "Avg_Annual_Wind_Speed":
            history["Avg_Annual_Wind_Speed"].mean(),

        "Avg_Annual_Surface_Pressure":
            history["Avg_Annual_Surface_Pressure"].mean()
    }

    weather = pd.DataFrame(
        [avg_weather] * years
    )

    return weather

def annualize_price_forecast(price_forecast):

    annual_price = (
        price_forecast
        .groupby("Year", as_index=False)["Predicted_Price"]
        .mean()
        .rename(
            columns={
                "Predicted_Price": "Average_Price"
            }
        )
    )

    return annual_price

def calculate_expected_revenue(
    annual_price,
    production_forecast
):

    revenue = annual_price.merge(

        production_forecast[
            [
                "Year",
                "Predicted_Production"
            ]
        ],

        on="Year",

        how="inner"

    )

    revenue["Expected_Revenue"] = (

        revenue["Average_Price"]

        *

        revenue["Predicted_Production"]

    )

    return revenue

def evaluate_crop(
    state,
    district,
    crop,
    season,
    area,
    start_year,
    years
):

    # -----------------------------------
    # Generate Weather Forecast
    # -----------------------------------

    price_weather = get_price_weather(
        state=state,
        crop=crop,
        start_year=start_year,
        start_month=1,
        months=years * 12
    )

    production_weather = get_production_weather(
        state=state,
        district=district,
        crop=crop,
        season=season,
        start_year=start_year,
        years=years
    )

    # -----------------------------------
    # Forecast Price
    # -----------------------------------

    price_forecast, _ = forecast_prices(
        state=state,
        crop=crop,
        start_year=start_year,
        start_month=1,
        months=years * 12,
        weather_data=price_weather
    )

    # -----------------------------------
    # Forecast Production
    # -----------------------------------

    production_forecast, _ = forecast_production(
        state=state,
        district=district,
        crop=crop,
        season=season,
        area=area,
        start_year=start_year,
        years=years,
        weather_data=production_weather
    )

    # -----------------------------------
    # Annual Price
    # -----------------------------------

    annual_price = annualize_price_forecast(
        price_forecast
    )

    # -----------------------------------
    # Revenue Table
    # -----------------------------------

    revenue_table = calculate_expected_revenue(
        annual_price,
        production_forecast
    )

    # -----------------------------------
    # Average Values
    # -----------------------------------

    average_price = annual_price[
        "Average_Price"
    ].mean()

    average_production = production_forecast[
        "Predicted_Production"
    ].mean()

    average_revenue = (
        average_price *
        average_production
    )

    # -----------------------------------
    # Yield Validation
    # -----------------------------------

    predicted_yield = (
        average_production / area
        if area > 0
        else np.nan
    )

    historical = production[
        (production["State"] == state) &
        (production["District_Name"] == district) &
        (production["Crop"] == crop) &
        (production["Season"] == season)
    ].copy()

    if historical.empty:

        historical_max_yield = np.nan
        yield_ratio = np.nan
        yield_warning = False

    else:

        historical["Yield"] = (
            historical["Production"] /
            historical["Area"]
        )

        historical_max_yield = historical[
            "Yield"
        ].max()

        yield_ratio = (
            predicted_yield /
            historical_max_yield
            if historical_max_yield > 0
            else np.nan
        )

        yield_warning = (
            predicted_yield >
            historical_max_yield * 1.20
        )

    # -----------------------------------
    # Return Results
    # -----------------------------------

    return {

        "Crop": crop,

        "Average_Price": average_price,

        "Average_Production": average_production,

        "Average_Revenue": average_revenue,

        "Revenue_Table": revenue_table,

        "Predicted_Yield": predicted_yield,

        "Historical_Max_Yield": historical_max_yield,

        "Yield_Ratio": yield_ratio,

        "Yield_Warning": yield_warning,

        "Price_Forecast": price_forecast,

        "Production_Forecast": production_forecast

    }

def calculate_crop_statistics(
    state,
    district,
    crop,
    season
):

    production_history = production[
        (production["State"] == state) &
        (production["District_Name"] == district) &
        (production["Crop"] == crop) &
        (production["Season"] == season)
    ].copy()

    price_history = price[
        (price["State"] == state) &
        (price["Standard_Crop"] == crop)
    ].copy()

    stats = {

        "Years_Grown":
            production_history["Year"].nunique(),

        "Avg_Area":
            production_history["Area"].mean(),

        "Avg_Production":
            production_history["Production"].mean(),

        "Production_STD":
            production_history["Production"].std(),

        "Production_CV":
            production_history["Production"].std()
            /
            production_history["Production"].mean(),

        "Avg_Price":
            price_history["Avg_Modal_Price"].mean(),

        "Price_STD":
            price_history["Avg_Modal_Price"].std(),

        "Price_CV":
            price_history["Avg_Modal_Price"].std()
            /
            price_history["Avg_Modal_Price"].mean()

    }

    return stats

def build_crop_statistics(
    state,
    district,
    season
):

    candidate_crops = get_candidate_crops(
        state,
        district,
        season
    )

    statistics = []

    for crop in candidate_crops:

        try:

            stats = calculate_crop_statistics(
                state,
                district,
                crop,
                season
            )

            # Skip crops with missing price statistics
            if pd.isna(stats["Avg_Price"]):
                continue

            stats["Crop"] = crop

            statistics.append(stats)

        except Exception:
            pass

    statistics=pd.DataFrame(statistics)
    
    statistics = statistics[
        statistics["Years_Grown"] >= 5
    ].reset_index(drop=True)

    return statistics

def evaluate_all_crops(
    state,
    district,
    season,
    area,
    start_year,
    years
):

    crop_statistics = build_crop_statistics(
        state,
        district,
        season
    )

    results = []

    for _, stat_row in crop_statistics.iterrows():

        crop = stat_row["Crop"]

        try:

            prediction = evaluate_crop(
                state=state,
                district=district,
                crop=crop,
                season=season,
                area=area,
                start_year=start_year,
                years=years
            )

            results.append({

                "Crop": crop,

                "Average_Price": prediction["Average_Price"],

                "Average_Production": prediction["Average_Production"],

                "Average_Revenue": prediction["Average_Revenue"],

                "Predicted_Yield": prediction["Predicted_Yield"],

                "Historical_Max_Yield": prediction["Historical_Max_Yield"],

                "Yield_Warning": prediction["Yield_Warning"],

                "Years_Grown": stat_row["Years_Grown"],

                "Avg_Area": stat_row["Avg_Area"],

                "Production_CV": stat_row["Production_CV"],

                "Price_CV": stat_row["Price_CV"]

            })

        except Exception as e:

            print(f"Skipping {crop}: {e}")

    # ---------------------------------------
    # Convert to DataFrame
    # ---------------------------------------

    results = pd.DataFrame(results)

    if results.empty:
        return results

    # ---------------------------------------
    # Score Crops
    # ---------------------------------------

    score_limits = {
        "Revenue_Min": results["Average_Revenue"].min(),
        "Revenue_Max": results["Average_Revenue"].max(),

        "Years_Min": results["Years_Grown"].min(),
        "Years_Max": results["Years_Grown"].max(),

        "PriceCV_Min": results["Price_CV"].min(),
        "PriceCV_Max": results["Price_CV"].max(),

        "ProductionCV_Min": results["Production_CV"].min(),
        "ProductionCV_Max": results["Production_CV"].max()
    }

    years_high = results["Years_Grown"].quantile(0.75)
    years_medium = results["Years_Grown"].quantile(0.50)

    risk_low = (
        results["Production_CV"] * 0.6 + results["Price_CV"] * 0.4
    ).quantile(0.33)

    risk_high = (
        results["Production_CV"] * 0.6 + results["Price_CV"] * 0.4
    ).quantile(0.66)
    
    results["Recommendation_Score"] = results.apply(
        calculate_recommendation_score,
        axis=1,
        score_limits=score_limits
    )

    results["Confidence"] = results.apply(
        calculate_confidence,
        axis=1
    )

    results["Risk"] = results.apply(
        calculate_risk,
        axis=1
    )

    results["Explanation"] = results.apply(
        generate_explanation,
        axis=1
    )

    # ---------------------------------------
    # Sort
    # ---------------------------------------

    results = results.sort_values(
        "Recommendation_Score",
        ascending=False
    ).reset_index(drop=True)

    results["Rank"] = range(
        1,
        len(results) + 1
    )

    return results