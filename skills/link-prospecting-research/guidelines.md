# Link Prospecting Research Guidelines

Load the minimum files needed for the task.

## By Task

| What you're doing | Load these files |
|-------------------|------------------|
| Running a full prospecting pass | `references/core/knowledge.md`, `references/core/rules.md`, `workflows/research-link-prospects.md` |
| Building query patterns | `references/core/examples.md`, `workflows/research-link-prospects.md` |
| Mapping opportunity types | `references/core/knowledge.md`, `references/core/examples.md` |
| Reviewing competitor backlinks for ideas | `references/core/rules.md`, `workflows/research-link-prospects.md` |
| Finding scrapeable lists or autocomplete seeds | `references/core/examples.md` |

## By Problem

| If you notice... | Load these files |
|------------------|------------------|
| Prospect list is detached from assets | `references/core/rules.md` |
| User only has obvious queries like "[industry] blog" | `references/core/examples.md` |
| Competitor backlink exports are treated as outreach-ready | `references/core/rules.md` |
| Search results are noisy | `workflows/research-link-prospects.md` |
| The user wants outreach copy | Prefer `link-outreach-acquisition` skill |

## Decision Tree

```text
What is the user asking for?
|
+-- Find prospect sources -> research-link-prospects workflow
+-- Create queries -> examples + workflow
+-- Interpret opportunity types -> knowledge
+-- Qualify URLs -> prefer link-prospect-qualification skill
+-- Write outreach -> prefer link-outreach-acquisition skill
```

## File Index

| File | Purpose |
|------|---------|
| `references/core/knowledge.md` | Concepts, terminology, and source anchors |
| `references/core/rules.md` | Prospecting rules and boundaries |
| `references/core/examples.md` | Query pattern and opportunity examples |
| `workflows/research-link-prospects.md` | Repeatable prospecting workflow |
