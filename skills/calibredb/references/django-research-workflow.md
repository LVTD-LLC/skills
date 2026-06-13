# Django-Book Research Workflow (Calibre)

Use this workflow when asked to identify/read Django books from Calibre.

## Step 1 — discover Django titles

```bash
calibredb list --with-library /mnt/calibre \
  --fields id,title,authors,tags,formats,pubdate \
  --search "title:django or tags:django or comments:django" \
  --for-machine
```

Fallback if metadata is sparse:

```bash
calibredb search --with-library /mnt/calibre "title:django"
```

## Step 2 — inspect per-book metadata

```bash
calibredb show_metadata --with-library /mnt/calibre <id>
```

Capture:
- title
- author
- year/pubdate
- available formats
- tags/series/identifiers

## Step 3 — extract readable content for deep reading

Preferred path:
1. Get format file paths from `list --for-machine`.
2. Convert/extract text from EPUB/PDF as needed with separate tooling.
3. Build per-book summaries + cross-book synthesis.

## Step 4 — produce structured output

Minimum output contract:
1. Book inventory table
2. Strengths/coverage by topic (fundamentals, APIs, production, testing, DX)
3. Practical takeaways translated into skill instructions
4. Confidence notes (full-text vs metadata-only)
