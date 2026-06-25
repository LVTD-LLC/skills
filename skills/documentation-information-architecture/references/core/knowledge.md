# Documentation IA Knowledge

Information architecture helps readers build a mental model of a documentation set and move from question to answer without unnecessary searching.

Source basis: *Docs for Developers*, Chapter 10, "Organizing documentation."

## Structure Patterns

| Pattern | Use |
|---------|-----|
| Sequence | Ordered learning path, onboarding, migration, or setup |
| Hierarchy | Parent-child organization by product area, task group, or concept set |
| Web | Cross-linked related content for non-linear exploration |

Most docs sites combine these patterns: a hierarchy for navigation, sequences for onboarding, and web links for related tasks.

## Navigation Elements

- Site navigation.
- Landing pages.
- Breadcrumbs.
- Side navigation.
- Prerequisites and next steps.
- Related links.
- Metadata, labels, and search facets.
- Redirects during migration.

## Content Inventory Actions

| Label | Meaning |
|-------|---------|
| Keep | Current, useful, and in the right place |
| Remove | Stale, unused, unsupported, or harmful |
| Review | Needs owner or source validation |
| Merge | Overlaps with another page |
| Split | Contains multiple user goals or doc types |
| Move | Useful but in the wrong location |
| Create | Gap required by user tasks |

## Common Misconceptions

- **Myth**: More navigation cues always improve findability.
  **Reality**: Too many cues create noise and decision fatigue.
- **Myth**: IA should mirror engineering architecture.
  **Reality**: IA should mirror reader tasks and mental models.
- **Myth**: Migration is done when pages move.
  **Reality**: Redirects, metadata, search, links, and user validation are part of migration.

## Rules And Checks

Use these rules when auditing or redesigning documentation information architecture.

## Core Rules

1. **Start with user tasks** - Organize around what readers need to do, learn, decide, or fix.
2. **Inventory before redesign** - Know what exists before proposing structure.
3. **Label content actions** - Keep, remove, review, merge, split, move, or create.
4. **Use landing pages for routing** - A landing page should get readers to the right place quickly.
5. **Avoid excessive depth** - Deep hierarchies bury content; shallow hierarchies can become noisy.
6. **Use navigation cues economically** - Add cues that solve real orientation problems.
7. **Preserve redirects** - Migrations need redirect plans and link validation.
8. **Document IA decisions** - Future maintainers need to know why content belongs where it does.
9. **Plan maintenance** - Owners, metadata, and review triggers prevent drift.

## Quick Checks

| Question | Good Answer |
|----------|-------------|
| Where should a new user start? | Clear entry point or sequence |
| Where should an experienced user look up details? | Findable reference path |
| Is content duplicated? | Merged or clearly scoped pages |
| What happens to moved pages? | Redirect and link update plan |
| How will IA stay current? | Owner, metadata, and review cadence |

## Red Flags

- Top-level navigation is a product org chart.
- A landing page contains long prose but weak routing.
- Pages with different purposes are nested because they share a keyword.
- Migration omits redirects, metadata, or search impact.
- No one can explain why a page belongs in its section.


## Examples And Patterns

Use these examples as IA decision patterns.

## Structure Choice

Scenario: Organize docs for a payments API.

| User Need | IA Pattern |
|-----------|------------|
| Complete first integration | Sequence: quickstart steps |
| Find object and endpoint details | Hierarchy: API reference by resource |
| Explore related webhook tasks | Web: related links between guides |
| Choose product path | Landing page: route by use case |

## Inventory Row Pattern

```text
Page: /docs/webhooks/signatures
Current role: How-to guide
User task: Verify incoming webhook signatures
Status: Keep and update
Action: Add prerequisites, move conceptual explanation to overview, link troubleshooting page
Owner: Developer docs
Redirect needed: No
```

## Split Decision

Weak page: "Webhooks" includes concept overview, event reference, setup tutorial, errors, retries, and migration notes.

Better IA:

- `webhooks/overview` for concepts and lifecycle.
- `webhooks/quickstart` for first delivery.
- `webhooks/signatures` for verification task.
- `reference/events` for event schema.
- `webhooks/troubleshooting` for failed delivery and invalid signatures.
