# Documentation Planning Knowledge

Developer documentation plans connect user goals to the right content types, scope, sequence, owners, and review path.

Source basis: *Docs for Developers*, Chapter 2, "Planning your documentation."

## Content Types

| Type | Best For |
|------|----------|
| Code comments | Explaining local implementation decisions, tradeoffs, and non-obvious code behavior |
| README | Project overview, setup, contribution basics, links to deeper docs |
| Getting started | First successful experience and product evaluation |
| Conceptual docs | Explaining a model, domain concept, architecture, or why something works |
| Tutorial | Guided learning path toward a known result |
| How-to guide | Completing a specific real-world task |
| API reference | Accurate details for endpoints, methods, parameters, types, status codes, and errors |
| Glossary | Consistent definitions for product or domain terms |
| Troubleshooting | Recognizing symptoms and recovering from known failures |
| Changelog | What changed and when |
| Release notes | What changed, why it matters, who is affected, and what action is required |

## Documentation Plan

A useful plan answers:

- Who is the reader?
- What goal does the doc support?
- Which content type fits the goal?
- What source of truth keeps it accurate?
- Who owns review and approval?
- What blocks publication?
- How will the team know the doc worked?

## Content Outline

Use an outline to expose missing prerequisites, overloaded pages, bad sequencing, and unclear ownership before drafting.

## Common Misconceptions

- **Myth**: A README can replace all developer docs.
  **Reality**: A README can route, summarize, and bootstrap; deeper tasks often need separate docs.
- **Myth**: Reference docs teach new users.
  **Reality**: Reference docs answer specific lookup questions; onboarding usually needs guided context.
- **Myth**: More content types always mean better docs.
  **Reality**: Each added doc increases maintenance load and should map to a real user task.
