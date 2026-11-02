import os
import pandas as pd

# ==========================================
# HarvestIQ - Master Crop Registry Generator
# ==========================================

crops = [
    # Cereals
    ("Rice", "Oryza sativa", "Cereal", "Annual"),
    ("Wheat", "Triticum aestivum", "Cereal", "Annual"),
    ("Maize", "Zea mays", "Cereal", "Annual"),
    ("Pearl Millet (Bajra)", "Pennisetum glaucum", "Cereal", "Annual"),
    ("Sorghum (Jowar)", "Sorghum bicolor", "Cereal", "Annual"),
    ("Finger Millet (Ragi)", "Eleusine coracana", "Cereal", "Annual"),
    ("Barley", "Hordeum vulgare", "Cereal", "Annual"),

    # Pulses
    ("Pigeon Pea (Arhar/Tur)", "Cajanus cajan", "Pulse", "Annual"),
    ("Green Gram (Moong)", "Vigna radiata", "Pulse", "Annual"),
    ("Black Gram (Urad)", "Vigna mungo", "Pulse", "Annual"),
    ("Chickpea (Gram)", "Cicer arietinum", "Pulse", "Annual"),
    ("Lentil (Masoor)", "Lens culinaris", "Pulse", "Annual"),
    ("Field Pea", "Pisum sativum", "Pulse", "Annual"),
    ("Horse Gram", "Macrotyloma uniflorum", "Pulse", "Annual"),
    ("Cowpea", "Vigna unguiculata", "Pulse", "Annual"),

    # Oilseeds
    ("Groundnut", "Arachis hypogaea", "Oilseed", "Annual"),
    ("Soybean", "Glycine max", "Oilseed", "Annual"),
    ("Mustard", "Brassica juncea", "Oilseed", "Annual"),
    ("Sunflower", "Helianthus annuus", "Oilseed", "Annual"),
    ("Sesame", "Sesamum indicum", "Oilseed", "Annual"),
    ("Castor", "Ricinus communis", "Oilseed", "Annual"),
    ("Safflower", "Carthamus tinctorius", "Oilseed", "Annual"),
    ("Niger", "Guizotia abyssinica", "Oilseed", "Annual"),

    # Fiber Crops
    ("Cotton", "Gossypium hirsutum", "Fiber", "Annual"),
    ("Jute", "Corchorus olitorius", "Fiber", "Annual"),
    ("Mesta", "Hibiscus cannabinus", "Fiber", "Annual"),
    ("Sunn Hemp", "Crotalaria juncea", "Fiber", "Annual"),

    # Sugar & Plantation Crops
    ("Sugarcane", "Saccharum officinarum", "Sugar Crop", "Perennial"),
    ("Tea", "Camellia sinensis", "Plantation", "Perennial"),
    ("Coffee", "Coffea arabica", "Plantation", "Perennial"),
    ("Coconut", "Cocos nucifera", "Plantation", "Perennial"),
    ("Arecanut", "Areca catechu", "Plantation", "Perennial"),

    # Vegetables
    ("Onion", "Allium cepa", "Vegetable", "Annual"),
    ("Potato", "Solanum tuberosum", "Vegetable", "Annual"),
    ("Tomato", "Solanum lycopersicum", "Vegetable", "Annual"),
    ("Brinjal (Eggplant)", "Solanum melongena", "Vegetable", "Annual"),
    ("Okra", "Abelmoschus esculentus", "Vegetable", "Annual"),
    ("Cabbage", "Brassica oleracea var. capitata", "Vegetable", "Annual"),
    ("Cauliflower", "Brassica oleracea var. botrytis", "Vegetable", "Annual"),
    ("Green Chilli", "Capsicum annuum", "Vegetable", "Annual"),
    ("Garlic", "Allium sativum", "Vegetable", "Annual"),
    ("Ginger", "Zingiber officinale", "Vegetable", "Perennial"),

    # Spices
    ("Dry Chilli", "Capsicum annuum", "Spice", "Annual"),
    ("Turmeric", "Curcuma longa", "Spice", "Perennial"),
    ("Coriander", "Coriandrum sativum", "Spice", "Annual"),
    ("Cumin", "Cuminum cyminum", "Spice", "Annual"),
    ("Fenugreek", "Trigonella foenum-graecum", "Spice", "Annual"),
    ("Black Pepper", "Piper nigrum", "Spice", "Perennial"),
    ("Cardamom", "Elettaria cardamomum", "Spice", "Perennial"),
    ("Fennel", "Foeniculum vulgare", "Spice", "Annual"),
]

# Create DataFrame
df = pd.DataFrame(
    {
        "Crop_ID": range(1, len(crops) + 1),
        "Crop_Name": [c[0] for c in crops],
        "Scientific_Name": [c[1] for c in crops],
        "Crop_Category": [c[2] for c in crops],
        "Crop_Type": [c[3] for c in crops],
    }
)

# Output directory
output_dir = os.path.join("../datasets", "knowledge")
os.makedirs(output_dir, exist_ok=True)

output_file = os.path.join(output_dir, "crop_registry.csv")

# Save CSV
df.to_csv(output_file, index=False)

print("=" * 50)
print("HarvestIQ Master Crop Registry Generated Successfully!")
print(f"Total Crops : {len(df)}")
print(f"Output File : {output_file}")
print("=" * 50)