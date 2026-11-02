"""
HarvestIQ Knowledge Framework

Crop Factory

Converts parsed YAML dictionaries into Crop objects.
"""

from ..models.crop import Crop, CropInfo, CropProfile
from ..models.enums import (
    CropCategory,
    CropType,
    WaterRequirement,
    RootDepth,
    RiskLevel,
    MarketDemand,
)


class CropFactory:

    @staticmethod
    def create(data: dict) -> Crop:
        """
        Convert YAML dictionary into Crop object.
        """
        return Crop(
            info=CropFactory._build_crop_info(data),
            profile=CropFactory._build_profile(data),

            # We'll add these next
            climate=None,
            soil=None,
            fertilizer=None,
            calendar=None,
            market=None,
            sources=(),
        )

    @staticmethod
    def _build_crop_info(data: dict) -> CropInfo:
        crop = data["crop"]

        return CropInfo(
            id=crop["id"],
            name=crop["name"],
            scientific_name=crop["scientific_name"],
            category=CropCategory(crop["category"]),
            crop_type=CropType(crop["type"]),
        )

    @staticmethod
    def _build_profile(data: dict) -> CropProfile:
        profile = data["profile"]

        return CropProfile(
            duration_days=profile["duration_days"],
            water_requirement=WaterRequirement(profile["water_requirement"]),
            water_requirement_mm=profile["water_requirement_mm"],
            root_depth=RootDepth(profile["root_depth"]),
            risk_level=RiskLevel(profile["risk_level"]),
            storage_life_days=profile["storage_life_days"],
            market_demand=MarketDemand(profile["market_demand"]),
        )