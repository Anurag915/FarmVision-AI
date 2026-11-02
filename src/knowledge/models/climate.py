"""
HarvestIQ Knowledge Framework

Climate domain model.
"""

from dataclasses import dataclass

from .common import (
    TemperatureRange,
    RainfallRange,
    HumidityRange,
)


@dataclass(slots=True, frozen=True)
class ClimateProfile:
    """
    Climatic requirements for a crop.
    """

    temperature: TemperatureRange
    rainfall: RainfallRange
    humidity: HumidityRange

    def is_temperature_suitable(self, temperature: float) -> bool:
        """Check whether a temperature is suitable."""
        return self.temperature.contains(temperature)

    def is_rainfall_suitable(self, rainfall: float) -> bool:
        """Check whether rainfall is suitable."""
        return self.rainfall.contains(rainfall)

    def is_humidity_suitable(self, humidity: float) -> bool:
        """Check whether humidity is suitable."""
        return self.humidity.contains(humidity)