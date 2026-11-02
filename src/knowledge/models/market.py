"""
HarvestIQ Knowledge Framework

Market information.
"""

from dataclasses import dataclass

from .enums import (
    ExportPotential,
    MarketDemand,
    PriceVolatility,
    StorageFacility,
)


@dataclass(slots=True, frozen=True)
class MarketProfile:

    msp: bool

    demand: MarketDemand

    export_potential: ExportPotential

    price_volatility: PriceVolatility

    storage: StorageFacility