"""
HarvestIQ Knowledge Framework

Common reusable value objects.
"""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class NumericRange:
    """
    Generic numeric range.

    Example:
        Temperature
        Rainfall
        Humidity
        Soil pH
    """
    minimum: float
    maximum: float

    def contains(self, value: float) -> bool:
        return self.minimum <= value <= self.maximum


@dataclass(frozen=True, slots=True)
class TemperatureRange(NumericRange):
    """Temperature range in °C."""
    pass


@dataclass(frozen=True, slots=True)
class RainfallRange(NumericRange):
    """Rainfall range in mm/season."""
    pass


@dataclass(frozen=True, slots=True)
class HumidityRange(NumericRange):
    """Relative humidity in %."""
    pass


@dataclass(frozen=True, slots=True)
class PHRange(NumericRange):
    """Soil pH range."""
    pass