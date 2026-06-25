---
name: documentation-information-architecture
description: Audit, organize, and redesign developer documentation information architecture, including content inventory, navigation, landing pages, sequences, hierarchies, webs, breadcrumbs, sidebars, metadata, redirects, migration, and maintainable IA decisions. Use when restructuring docs sites, improving findability, planning doc migration, or organizing large documentation sets.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Documentation Information Architecture
  category: Writing
  tags: developer-docs,technical-writing,documentation,information-architecture,navigation
---

# Documentation Information Architecture

Use this skill to organize developer documentation so readers can find the right content at the right time. It works at doc-set and site level rather than single-page prose level.

This skill is derived from *Docs for Developers: An Engineer's Field Guide to Technical Writing*, especially Chapter 10, "Organizing documentation." The guidance is transformed and paraphrased; do not copy book prose into user outputs. Source: https://link.springer.com/book/10.1007/978-1-4842-7217-6

## Quick Start

1. Load `guidelines.md` to choose the smallest useful reference set.
2. Identify user mental models, common tasks, and existing content inventory.
3. Choose or combine sequence, hierarchy, and web structures.
4. Use `workflows/audit-doc-ia.md` for full IA audit or redesign.
5. Preserve redirects, metadata, source decisions, and maintenance rules.

## Default Output

When auditing or redesigning IA, return:

1. **Current-state findings** - navigation, gaps, duplication, stale content, and findability issues.
2. **User model** - major audiences, tasks, and entry points.
3. **Recommended structure** - sequence, hierarchy, web, landing pages, and navigation cues.
4. **Content actions** - keep, remove, review, merge, split, move, or create.
5. **Migration plan** - redirects, metadata, owners, and validation.
6. **Maintenance plan** - how IA decisions stay current.

## Contents

| Need | Start Here |
|------|------------|
| Understand IA patterns | `references/core/knowledge.md` |
| Apply IA rules | `references/core/rules.md` |
| See IA examples | `references/core/examples.md` |
| Audit or redesign IA | `workflows/audit-doc-ia.md` |
| Route by task | `guidelines.md` |

## Core Posture

- Organize docs around user mental models and tasks.
- Use landing pages to route quickly, not to create marketing detours.
- Keep navigation cues useful but economical.
- Treat migration and maintenance as part of IA design.
