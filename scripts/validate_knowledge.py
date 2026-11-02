import os
import yaml

SCHEMA_FILE = "knowledge/schema.yaml"
CROPS_DIR = "knowledge/crops"


# --------------------------------------------------
# Load YAML
# --------------------------------------------------

def load_yaml(path):
    with open(path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)


schema = load_yaml(SCHEMA_FILE)

required_sections = schema["required_sections"]
required_fields = schema["required_fields"]
enums = schema["enums"]
validation = schema["validation"]

crop_ids = set()
crop_names = set()

errors = []

# --------------------------------------------------
# Validate all crop YAML files
# --------------------------------------------------

for filename in os.listdir(CROPS_DIR):

    if not filename.endswith(".yaml"):
        continue

    filepath = os.path.join(CROPS_DIR, filename)

    crop = load_yaml(filepath)

    print(f"Checking {filename}")

    # ------------------------------------------
    # Required Sections
    # ------------------------------------------

    for section in required_sections:

        if section not in crop:
            errors.append(f"{filename}: Missing section '{section}'")

    if errors:
        continue

    # ------------------------------------------
    # Required Fields
    # ------------------------------------------

    for section in required_fields:

        for field in required_fields[section]:

            if field not in crop[section]:
                errors.append(
                    f"{filename}: Missing field '{section}.{field}'"
                )

    # ------------------------------------------
    # Duplicate IDs
    # ------------------------------------------

    crop_id = crop["crop"]["id"]

    if crop_id in crop_ids:
        errors.append(f"{filename}: Duplicate Crop ID {crop_id}")

    crop_ids.add(crop_id)

    # ------------------------------------------
    # Duplicate Names
    # ------------------------------------------

    crop_name = crop["crop"]["name"]

    if crop_name in crop_names:
        errors.append(f"{filename}: Duplicate Crop Name {crop_name}")

    crop_names.add(crop_name)

    # ------------------------------------------
    # Enum Validation
    # ------------------------------------------

    if crop["crop"]["category"] not in enums["crop_category"]:
        errors.append(f"{filename}: Invalid Crop Category")

    if crop["crop"]["type"] not in enums["crop_type"]:
        errors.append(f"{filename}: Invalid Crop Type")

    if crop["profile"]["water_requirement"] not in enums["water_requirement"]:
        errors.append(f"{filename}: Invalid Water Requirement")

    if crop["profile"]["root_depth"] not in enums["root_depth"]:
        errors.append(f"{filename}: Invalid Root Depth")

    if crop["profile"]["risk_level"] not in enums["risk_level"]:
        errors.append(f"{filename}: Invalid Risk Level")

    if crop["profile"]["market_demand"] not in enums["market_demand"]:
        errors.append(f"{filename}: Invalid Market Demand")

# --------------------------------------------------
# Final Result
# --------------------------------------------------

print()

if errors:

    print("=" * 60)
    print("VALIDATION FAILED")
    print("=" * 60)

    for error in errors:
        print(error)

else:

    print("=" * 60)
    print("ALL KNOWLEDGE FILES ARE VALID")
    print("=" * 60)