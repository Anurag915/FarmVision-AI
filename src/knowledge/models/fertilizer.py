"""
HarvestIQ Knowledge Framework

Fertilizer recommendation model.
"""

from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class FertilizerProfile:
    """
    Recommended fertilizer requirement.
    """

    nitrogen: float
    phosphorus: float
    potassium: float
    organic_manure: float

    @property
    def npk_ratio(self) -> str:
        return f"{self.nitrogen}:{self.phosphorus}:{self.potassium}"