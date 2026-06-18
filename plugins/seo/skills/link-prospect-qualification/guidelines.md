# Link Prospect Qualification Guidelines

Load the minimum files needed for the task.

## By Task

| What you're doing | Load these files |
|-------------------|------------------|
| Qualifying a prospect list | `references/core/knowledge.md`, `references/core/rules.md`, `workflows/qualify-link-prospects.md` |
| Building a scoring rubric | `references/core/rules.md`, `references/core/examples.md` |
| Auditing trust or spam risk | `references/core/knowledge.md`, `references/core/rules.md` |
| Reviewing internal asset readiness | `references/core/rules.md` |
| Explaining reject reasons | `references/core/examples.md` |

## By Problem

| If you notice... | Load these files |
|------------------|------------------|
| Prospects are sorted only by authority | `references/core/rules.md` |
| Relevance and page intent are unclear | `workflows/qualify-link-prospects.md` |
| A high-authority prospect looks spammy | `references/core/knowledge.md`, `references/core/rules.md` |
| The target asset is orphaned or siloed | `references/core/rules.md` |
| User wants outreach next | Prefer `link-outreach-acquisition` skill |

## Decision Tree

```text
What is the user asking for?
|
+-- Score URLs -> qualify-link-prospects workflow
+-- Design rubric -> rules + examples
+-- Explain quality/trust -> knowledge
+-- Find more prospects -> prefer link-prospecting-research skill
+-- Draft emails -> prefer link-outreach-acquisition skill
```

## File Index

| File | Purpose |
|------|---------|
| `references/core/knowledge.md` | Concepts, terminology, and source anchors |
| `references/core/rules.md` | Qualification rules, gates, and rubric |
| `references/core/examples.md` | Scoring and rejection examples |
| `workflows/qualify-link-prospects.md` | Repeatable qualification workflow |
