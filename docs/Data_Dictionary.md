# 1. crop_profiles.csv

**Purpose**

Stores the master information for every crop supported by FarmVision AI.

**Primary Key:** Crop_ID

| Column | Data Type | Allowed Values | Unit | Description |
|----------|-----------|----------------|------|-------------|
| Crop_ID | Integer | Unique | - | Unique crop identifier |
| Crop_Name | String | Any | - | Common crop name |
| Scientific_Name | String | Any | - | Botanical name |
| Crop_Category | Enum | Cereal, Pulse, Oilseed, Vegetable, Fruit, Fiber, Plantation, Spice | - | Crop classification |
| Crop_Type | Enum | Annual, Biennial, Perennial | - | Crop lifecycle |
| Crop_Duration_Days | Integer | Positive | Days | Average crop duration |
| Water_Requirement | Enum | Low, Medium, High | - | Overall water requirement |
| Water_Requirement_mm | Integer | Positive | mm | Approximate seasonal water requirement |
| Root_Depth | Enum | Shallow, Medium, Deep | - | Root system depth |
| Risk_Level | Enum | Low, Medium, High | - | Overall cultivation risk |
| Storage_Life_Days | Integer | Positive | Days | Approximate storage life |
| Market_Demand | Enum | Low, Medium, High | - | General market demand |

---

# 2. soil_profiles.csv

**Purpose**

Stores properties of different soil types.

**Primary Key:** Soil_ID

| Column | Data Type | Allowed Values | Unit | Description |
|----------|-----------|----------------|------|-------------|
| Soil_ID | Integer | Unique | - | Unique soil identifier |
| Soil_Type | String | Any | - | Soil type |
| Soil_Texture | String | Any | - | Soil texture |
| Drainage | Enum | Poor, Moderate, Good | - | Soil drainage capability |
| Water_Holding_Capacity | Enum | Low, Medium, High | - | Water retention capability |
| Fertility | Enum | Low, Medium, High | - | General fertility |
| pH_Min | Float | 0–14 | pH | Minimum suitable pH |
| pH_Max | Float | 0–14 | pH | Maximum suitable pH |

---

# 3. soil_crop_map.csv

**Purpose**

Maps crops to suitable soil types.

**Composite Primary Key**

(Crop_ID, Soil_ID)

| Column | Data Type | Allowed Values | Unit | Description |
|----------|-----------|----------------|------|-------------|
| Crop_ID | Integer | Existing Crop_ID | - | Crop reference |
| Soil_ID | Integer | Existing Soil_ID | - | Soil reference |
| Suitability | Enum | Low, Medium, High | - | Suitability score |

---

# 4. climate_profiles.csv

**Purpose**

Stores climatic requirements for each crop.

**Primary Key:** Crop_ID

| Column | Data Type | Unit | Description |
|----------|-----------|------|-------------|
| Crop_ID | Integer | - | Crop reference |
| Temperature_Min_C | Float | °C | Minimum suitable temperature |
| Temperature_Max_C | Float | °C | Maximum suitable temperature |
| Rainfall_Min_mm | Integer | mm | Minimum rainfall requirement |
| Rainfall_Max_mm | Integer | mm | Maximum rainfall requirement |
| Humidity_Min | Integer | % | Minimum humidity |
| Humidity_Max | Integer | % | Maximum humidity |

---

# 5. fertilizer_data.csv

**Purpose**

Stores recommended fertilizer requirements.

**Primary Key:** Crop_ID

| Column | Data Type | Unit | Description |
|----------|-----------|------|-------------|
| Crop_ID | Integer | - | Crop reference |
| Nitrogen_kg_ha | Integer | kg/ha | Nitrogen recommendation |
| Phosphorus_kg_ha | Integer | kg/ha | Phosphorus recommendation |
| Potassium_kg_ha | Integer | kg/ha | Potassium recommendation |
| Organic_Manure | Float | t/ha | Organic manure recommendation |

---

# 6. crop_calendar.csv

**Purpose**

Stores sowing and harvesting windows.

**Primary Key:** Crop_ID

| Column | Data Type | Unit | Description |
|----------|-----------|------|-------------|
| Crop_ID | Integer | - | Crop reference |
| Season | Enum | Kharif, Rabi, Zaid, Multi-season | - | Suitable season |
| Sowing_Start | String | Month | Sowing start month |
| Sowing_End | String | Month | Sowing end month |
| Harvest_Start | String | Month | Harvest start month |
| Harvest_End | String | Month | Harvest end month |

---

# 7. market_info.csv

**Purpose**

Stores market-related information.

**Primary Key:** Crop_ID

| Column | Data Type | Allowed Values | Description |
|----------|-----------|----------------|-------------|
| Crop_ID | Integer | Existing Crop_ID | Crop reference |
| MSP_Available | Boolean | TRUE/FALSE | MSP availability |
| Typical_Demand | Enum | Low, Medium, High | General demand |
| Export_Potential | Enum | Low, Medium, High | Export potential |
| Price_Volatility | Enum | Low, Medium, High | Price fluctuation |
| Storage_Facility | Enum | Easy, Moderate, Difficult | Ease of storage |

---

# Relationships

crop_profiles.csv
│
├── climate_profiles.csv
├── fertilizer_data.csv
├── crop_calendar.csv
├── market_info.csv
│
└── soil_crop_map.csv
      │
      └── soil_profiles.csv

---

# Notes

- Crop_ID is the unique identifier for all crop-related datasets.
- Soil_ID is the unique identifier for all soil-related datasets.
- All recommendation and suitability modules should use IDs internally rather than crop or soil names.
- Crop names are intended for display in the user interface only.
- This knowledge base is designed to be extensible and can support future modules such as irrigation planning, pest advisory, fertilizer recommendation, and sustainability analysis.