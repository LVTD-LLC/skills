# Link Outreach Acquisition Guidelines

Load the minimum files needed for the task.

## By Task

| What you're doing | Load these files |
|-------------------|------------------|
| Drafting or reviewing outreach | `references/core/rules.md`, `references/core/examples.md`, `workflows/run-link-outreach.md` |
| Planning a full outreach campaign | `references/core/knowledge.md`, `references/core/rules.md`, `workflows/run-link-outreach.md` |
| Writing subject lines | `references/core/examples.md` |
| Handling replies and follow-ups | `references/core/rules.md`, `references/core/examples.md` |
| Setting bulk outreach guardrails | `references/core/knowledge.md`, `references/core/rules.md` |

## By Problem

| If you notice... | Load these files |
|------------------|------------------|
| Email uses generic praise | `references/core/rules.md` |
| Subject line implies fake history | `references/core/examples.md` |
| The request says only "link to us" | `references/core/knowledge.md`, `references/core/rules.md` |
| The user wants to send a large batch | `workflows/run-link-outreach.md` |
| Prospects have not been qualified | Prefer `link-prospect-qualification` skill |

## Decision Tree

```text
What is the user asking for?
|
+-- Draft/review email -> rules + examples
+-- Run a campaign -> run-link-outreach workflow
+-- Handle responses -> examples + workflow
+-- Need prospects -> prefer link-prospecting-research skill
+-- Need scoring -> prefer link-prospect-qualification skill
```

## File Index

| File | Purpose |
|------|---------|
| `references/core/knowledge.md` | Concepts, terminology, and source anchors |
| `references/core/rules.md` | Outreach rules and review rubric |
| `references/core/examples.md` | Subject line, response, and tracking examples |
| `workflows/run-link-outreach.md` | Repeatable outreach workflow |
