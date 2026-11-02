"""
HarvestIQ Knowledge Framework

Domain Enumerations

These enums define all categorical values used across the
knowledge base and ensure type safety throughout the system.
"""

from enum import Enum


class CropCategory(str, Enum):
    CEREAL = "Cereal"
    PULSE = "Pulse"
    OILSEED = "Oilseed"
    VEGETABLE = "Vegetable"
    FRUIT = "Fruit"
    FIBER = "Fiber"
    PLANTATION = "Plantation"
    SPICE = "Spice"
    SUGAR_CROP = "Sugar Crop"


class CropType(str, Enum):
    ANNUAL = "Annual"
    BIENNIAL = "Biennial"
    PERENNIAL = "Perennial"


class WaterRequirement(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class RootDepth(str, Enum):
    SHALLOW = "Shallow"
    MEDIUM = "Medium"
    DEEP = "Deep"


class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class MarketDemand(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class ExportPotential(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class PriceVolatility(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class StorageFacility(str, Enum):
    EASY = "Easy"
    MODERATE = "Moderate"
    DIFFICULT = "Difficult"


class Season(str, Enum):
    KHARIF = "Kharif"
    RABI = "Rabi"
    ZAID = "Zaid"
    SUMMER = "Summer"
    WINTER = "Winter"
    MULTI_SEASON = "Multi-season"


class Month(str, Enum):
    JANUARY = "January"
    FEBRUARY = "February"
    MARCH = "March"
    APRIL = "April"
    MAY = "May"
    JUNE = "June"
    JULY = "July"
    AUGUST = "August"
    SEPTEMBER = "September"
    OCTOBER = "October"
    NOVEMBER = "November"
    DECEMBER = "December"