"""
HarvestIQ Knowledge Framework

Crop domain model.
"""

from dataclasses import dataclass
from typing import Tuple

from .climate import ClimateProfile
from .soil import SoilProfile
from .fertilizer import FertilizerProfile
from .calendar import CropCalendar
from .market import MarketProfile
from .source import Source
from .enums import (
    CropCategory,
    CropType,
    WaterRequirement,
    RootDepth,
    RiskLevel,
    MarketDemand,
)


# --------------------------------------------------
# Crop Identity
# --------------------------------------------------

@dataclass(slots=True, frozen=True)
class CropInfo:
    """
    Basic immutable information about a crop.
    """

    id: int

    name: str

    scientific_name: str

    category: CropCategory

    crop_type: CropType


# --------------------------------------------------
# Crop Agronomic Profile
# --------------------------------------------------

@dataclass(slots=True, frozen=True)
class CropProfile:

    duration_days: int

    water_requirement: WaterRequirement

    water_requirement_mm: float

    root_depth: RootDepth

    risk_level: RiskLevel

    storage_life_days: int

    market_demand: MarketDemand


# --------------------------------------------------
# Crop Aggregate
# --------------------------------------------------

@dataclass(slots=True, frozen=True)
class Crop:
    """
    Complete crop knowledge object.
    """

    info: CropInfo

    profile: CropProfile

    climate: ClimateProfile

    soil: SoilProfile

    fertilizer: FertilizerProfile

    calendar: CropCalendar

    market: MarketProfile

    sources: Tuple[Source, ...]

    @property
    def crop_id(self) -> int:
        return self.info.id

    @property
    def name(self) -> str:
        return self.info.name

    @property
    def scientific_name(self) -> str:
        return self.info.scientific_name