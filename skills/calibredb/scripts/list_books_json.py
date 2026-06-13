#!/usr/bin/env python3
import argparse
import json
import subprocess
import sys


def run_calibredb(library: str, search: str | None, limit: int | None, fields: str) -> list[dict]:
    cmd = [
        "calibredb",
        "list",
        "--with-library",
        library,
        "--fields",
        fields,
        "--for-machine",
    ]
    if search:
        cmd += ["--search", search]
    if limit is not None:
        cmd += ["--limit", str(limit)]

    out = subprocess.check_output(cmd, text=True)
    return json.loads(out)


def main() -> int:
    parser = argparse.ArgumentParser(description="List Calibre books as JSON via calibredb list --for-machine")
    parser.add_argument("--library", default="/mnt/calibre", help="Calibre library path or content-server URL")
    parser.add_argument("--search", default=None, help="Calibre search expression")
    parser.add_argument("--limit", type=int, default=None, help="Max rows")
    parser.add_argument(
        "--fields",
        default="id,title,authors,tags,formats,pubdate",
        help="Comma-separated field names for calibredb list",
    )

    args = parser.parse_args()
    rows = run_calibredb(args.library, args.search, args.limit, args.fields)
    json.dump(rows, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
