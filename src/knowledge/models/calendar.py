"""
HarvestIQ Knowledge Framework

Crop calendar.
"""

from dataclasses import dataclass
from typing import Tuple

from .enums import Month, Season


@dataclass(slots=True, frozen=True)
class CropPeriod:
    start: Month
    end: Month


@dataclass(slots=True, frozen=True)
class CropCalendar:
    """
    Crop calendar information.
    """

    seasons: Tuple[Season, ...]

    sowing: CropPeriod

    harvest: CropPeriod