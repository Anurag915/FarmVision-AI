"""
HarvestIQ Knowledge Framework

YAML loading utilities.
"""

from pathlib import Path
from typing import Any

import yaml


class YAMLLoader:
    """Loads crop knowledge YAML files."""

    def load(self, file_path: str | Path) -> dict[str, Any]:
        path = Path(file_path)

        if not path.exists():
            raise FileNotFoundError(f"Knowledge file not found: {path}")

        with path.open("r", encoding="utf-8") as file:
            data = yaml.safe_load(file)

        if data is None:
            raise ValueError(f"Empty YAML file: {path}")

        return data

    def load_directory(self, directory: str | Path) -> list[dict[str, Any]]:
        directory = Path(directory)

        crops = []

        for file in sorted(directory.glob("*.yaml")):
            crops.append(self.load(file))

        return crops