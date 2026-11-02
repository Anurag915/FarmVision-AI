"""Update the two simple Kubernetes manifests with published image digests."""

import argparse
from pathlib import Path
import re


def update_manifest(text: str, image: str) -> str:
    if not re.fullmatch(r"ghcr\.io/[a-z0-9._/-]+@sha256:[0-9a-f]{64}", image):
        raise ValueError(f"Expected a GHCR image pinned by digest: {image}")
    text, images = re.subn(r"(?m)^(\s*image:)\s*\S+\s*$", rf"\g<1> {image}", text)
    text, policies = re.subn(
        r"(?m)^(\s*imagePullPolicy:)\s*\S+\s*$", r"\g<1> IfNotPresent", text
    )
    if images != 1 or policies != 1:
        raise ValueError("Expected exactly one image and imagePullPolicy per manifest")
    return text


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--api", required=True)
    parser.add_argument("--web", required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    # Validate both changes before writing either file.
    changes = []
    for filename, image in (("backend.yaml", args.api), ("frontend.yaml", args.web)):
        path = root / "k8s" / filename
        changes.append((path, update_manifest(path.read_text(encoding="utf-8"), image)))
    for path, text in changes:
        path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
