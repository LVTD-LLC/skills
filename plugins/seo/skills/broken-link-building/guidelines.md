# Broken Link Building Guidelines

Load the minimum files needed for the task.

## By Task

| What you're doing | Load these files |
|-------------------|------------------|
| Running a broken-link campaign | `references/core/knowledge.md`, `references/core/rules.md`, `workflows/run-broken-link-building.md` |
| Designing tracking fields | `references/core/examples.md` |
| Reviewing replacement fit | `references/core/rules.md` |
| Planning link equity salvage | `references/core/knowledge.md`, `workflows/run-broken-link-building.md` |
| Preparing outreach notes | `references/core/examples.md` |

## By Problem

| If you notice... | Load these files |
|------------------|------------------|
| Dead URLs were checked only once | `references/core/rules.md` |
| Backlink exports are being treated as prospect lists | `workflows/run-broken-link-building.md` |
| Replacement page is only loosely related | `references/core/rules.md` |
| User owns old URLs with backlinks | `workflows/run-broken-link-building.md` |
| User needs email copy | Prefer `link-outreach-acquisition` skill after BLB notes |

## Decision Tree

```text
What is the user asking for?
|
+-- Find dead-link opportunities -> run-broken-link-building workflow
+-- Recover own lost backlinks -> salvage branch in workflow
+-- Define fields -> examples
+-- Qualify referring pages -> link-prospect-qualification skill
+-- Draft email -> link-outreach-acquisition skill
```

## File Index

| File | Purpose |
|------|---------|
| `references/core/knowledge.md` | Concepts, terminology, and source anchors |
| `references/core/rules.md` | BLB rules and red flags |
| `references/core/examples.md` | Tracking fields and outreach examples |
| `workflows/run-broken-link-building.md` | Repeatable BLB and salvage workflow |
