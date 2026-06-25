---
name: developer-docs-planning
description: Plan developer documentation by choosing content types, defining scope, outlining docs, and turning user needs into a practical documentation plan. Use when planning READMEs, getting-started guides, concepts, tutorials, how-to guides, API references, troubleshooting docs, changelogs, release notes, or multi-doc launch plans.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Developer Docs Planning
  category: Writing
  tags: developer-docs,technical-writing,documentation,planning,content-strategy
---

# Developer Docs Planning

Use this skill to decide what developer documentation to create before drafting. It maps user needs to content types, scope, outline, ownership, and release context.

This skill is derived from *Docs for Developers: An Engineer's Field Guide to Technical Writing*, especially Chapter 2, "Planning your documentation." The guidance is transformed and paraphrased; do not copy book prose into user outputs. Source: https://link.springer.com/book/10.1007/978-1-4842-7217-6

## Quick Start

1. Load `guidelines.md` to choose the smallest useful reference set.
2. Confirm user goal, audience, product surface, and release context.
3. Choose content types by user task, not by internal org structure.
4. Use `workflows/create-doc-plan.md` for a full plan.
5. Output an outline with doc type, purpose, owner, source of truth, dependencies, and validation.

## Default Output

When planning documentation, return:

1. **Audience and goal** - who the docs serve and what they must accomplish.
2. **Content type decisions** - recommended docs and why each belongs.
3. **Documentation outline** - pages or sections with purpose and ordering.
4. **Source-of-truth map** - code, API schema, product owner, support data, or design source.
5. **Release and review plan** - owners, approvals, and timing.
6. **Open questions** - decisions blocking accurate docs.

## Contents

| Need | Start Here |
|------|------------|
| Understand doc types | `references/core/knowledge.md` |
| Apply planning rules | `references/core/knowledge.md` |
| See plan examples | `references/core/knowledge.md` |
| Create a documentation plan | `workflows/create-doc-plan.md` |
| Route by task | `guidelines.md` |

## Core Posture

- Let user tasks choose the content type.
- Keep each doc anchored to one primary goal.
- Treat plans as lightweight engineering artifacts, not ceremony.
- If the documentation plan feels like a maze, consider whether the product or information architecture is too complex.
