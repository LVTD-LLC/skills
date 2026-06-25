---
name: docs-feedback-triage
description: Gather, classify, prioritize, and act on developer documentation feedback from page feedback, support issues, sentiment, surveys, user councils, bug reports, and user follow-up. Use when setting up docs feedback channels, triaging docs issues, prioritizing doc fixes, or converting feedback into actionable documentation work.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Docs Feedback Triage
  category: Writing
  tags: developer-docs,technical-writing,documentation,feedback,triage
---

# Docs Feedback Triage

Use this skill to turn developer documentation feedback into valid, actionable, prioritized work. It helps agents avoid treating every comment as equal while preserving user evidence.

This skill is derived from *Docs for Developers: An Engineer's Field Guide to Technical Writing*, especially Chapter 8, "Gathering and integrating feedback." The guidance is transformed and paraphrased; do not copy book prose into user outputs. Source: https://link.springer.com/book/10.1007/978-1-4842-7217-6

## Quick Start

1. Load `guidelines.md` to choose the smallest useful reference set.
2. Identify feedback source, affected doc, user impact, and whether the issue is docs-owned.
3. Test validity, actionability, and importance before recommending work.
4. Use `workflows/triage-doc-feedback.md` for a full triage pass.
5. Close the loop with users or source teams when the feedback changes product, support, or docs work.

## Default Output

When triaging feedback, return:

1. **Feedback summary** - source, affected doc, user type, and reported problem.
2. **Classification** - valid/invalid/needs research, docs/product/support issue, duplicate status.
3. **Actionability** - reproducible, scoped, and fixable information.
4. **Priority** - severity and rationale.
5. **Recommended action** - doc fix, routing, follow-up, or no action.
6. **Follow-up** - user response, owner, and evidence to collect.

## Contents

| Need | Start Here |
|------|------------|
| Understand feedback channels | `references/core/knowledge.md` |
| Apply triage rules | `references/core/knowledge.md` |
| See triage examples | `references/core/knowledge.md` |
| Triage feedback | `workflows/triage-doc-feedback.md` |
| Route by task | `guidelines.md` |

## Core Posture

- Feedback is evidence, not a direct order.
- Distinguish docs problems from product, support, pricing, or policy problems.
- Prioritize by user impact and fixability.
- Follow up when users took time to report a real issue.
