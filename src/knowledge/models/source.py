"""
HarvestIQ Knowledge Framework

Knowledge source information.
"""

from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class Source:

    name: str

    type: str

    url: str | None = None

    year: int | None = None

    notes: str | None = None