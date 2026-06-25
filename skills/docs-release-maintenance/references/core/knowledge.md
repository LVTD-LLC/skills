# Docs Release Maintenance Knowledge

Documentation has a lifecycle that should track product and code lifecycles: plan, review, publish, announce, measure, maintain, deprecate, and remove when appropriate.

Source basis: *Docs for Developers*, Chapter 7, "Publishing documentation," and Chapter 11, "Maintaining and deprecating documentation."

## Release Concepts

| Concept | Meaning |
|---------|---------|
| Publishing timeline | When docs draft, review, approval, publish, and announcement happen |
| Release alignment | Docs ship with or before the software users need to understand |
| Final approver | Person accountable for publication readiness |
| Delivery channel | Where users will find the docs |
| Announcement | How users learn new or changed docs exist |

## Maintenance Concepts

| Concept | Meaning |
|---------|---------|
| Owner | Person or team responsible for accuracy |
| Freshness check | Scheduled or triggered review of content accuracy |
| Link checker | Detects broken internal or external references |
| Linter | Enforces style, structure, or link rules mechanically |
| Generated reference | API or code-derived docs that still need human review |

## Deprecation And Deletion

Deprecation warns users that content, feature behavior, or product support is ending. Deletion removes content that is stale, harmful, unsupported, or replaced. Both need alternatives, timing, redirects, and user communication.

## Common Misconceptions

- **Myth**: Docs can be written after launch.
  **Reality**: Users need docs when the release affects them.
- **Myth**: Automation fixes maintenance.
  **Reality**: Automation amplifies whatever process exists, good or bad.
- **Myth**: Removing stale docs is just cleanup.
  **Reality**: Users may still depend on old URLs, migration paths, or warnings.
