import os
import cdsapi

# -----------------------------
# Configuration
# -----------------------------

DATASET = "derived-era5-single-levels-daily-statistics"

OUTPUT_DIR = "datasets/raw/weather"

VARIABLES = {
    "total_precipitation": {
        "daily_statistic": "daily_sum",
        "folder": "precipitation"
    }
}

YEARS = 2004

MONTHS = [f"{i:02d}" for i in range(1, 13)]
DAYS = [f"{i:02d}" for i in range(1, 32)]

AREA = [37.5, 68, 6, 97.5]

client = cdsapi.Client()

# -----------------------------
# Download Loop
# -----------------------------

for variable, info in VARIABLES.items():

    folder = os.path.join(OUTPUT_DIR, info["folder"])
    os.makedirs(folder, exist_ok=True)

    # for year in YEARS:

    output_file = os.path.join(
        folder,
        f"{variable}_{YEARS}.nc"
    )

    if os.path.exists(output_file):
        print(f"Skipping {output_file}")
        continue

    print(f"Downloading {variable} ({YEARS})...")

    request = {
            "product_type": "reanalysis",
            "variable": [variable],
            "year": str(YEARS),
            "month": MONTHS,
            "day": DAYS,
            "daily_statistic": info["daily_statistic"],
            "time_zone": "utc+05:00",
            "frequency": "1_hourly",
            "area": AREA,
        }

    client.retrieve(
        DATASET,
        request,
        output_file
    )

    print(f"Saved -> {output_file}")

print("\nAll downloads completed.")