"""
HarvestIQ Knowledge Framework

Soil domain model.
"""

from dataclasses import dataclass
from typing import Tuple

from .common import PHRange


@dataclass(slots=True, frozen=True)
class SoilProfile:
    """
    Soil suitability information.
    """

    suitable_soils: Tuple[str, ...]
    preferred_ph: PHRange

    def supports_soil(self, soil_type: str) -> bool:
        return soil_type in self.suitable_soils

    def supports_ph(self, ph: float) -> bool:
        return self.preferred_ph.contains(ph)