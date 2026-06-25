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

## Rules And Checks

Use these rules when deciding what developer documentation to create.

## Core Rules

1. **Choose by user task** - Match content type to what the reader is trying to do.
2. **Use one primary purpose per doc** - Split or route when a doc tries to teach, reference, troubleshoot, and announce at once.
3. **Plan source of truth early** - API fields, generated references, release notes, and code samples need owners and authoritative sources.
4. **Make prerequisites explicit** - Setup, access, version, plan, permission, and environment requirements belong in the plan.
5. **Separate learning from lookup** - Tutorials and concepts teach; references and changelogs support precise lookup.
6. **Keep plans lightweight** - Use enough structure to reveal gaps, dependencies, and owners.
7. **Flag product complexity** - If the doc outline requires too many caveats or branches, surface product or UX complexity rather than hiding it.
8. **Plan maintenance** - Every doc needs an owner, review signal, or source that keeps it accurate.

## Content-Type Selection

| Reader Need | Prefer |
|-------------|--------|
| "Can I use this?" | Overview or getting started |
| "How does this concept work?" | Conceptual doc |
| "Teach me the path once" | Tutorial |
| "Help me complete this task" | How-to guide |
| "What does this parameter mean?" | Reference |
| "This failed" | Troubleshooting |
| "What changed?" | Changelog or release notes |

## Red Flags

- The plan follows internal component order rather than user workflow.
- No one can say which doc answers the first user question.
- Reference details will be copied manually from code or schemas.
- Release notes omit impact or action required.
- Troubleshooting docs become a sprawling FAQ without symptoms or fixes.


## Examples And Patterns

Use these examples to shape plans and content-type decisions.

## Content-Type Decision

Scenario: A team is launching webhook signing.

| User Need | Recommended Doc | Why |
|-----------|-----------------|-----|
| Understand why signatures exist | Conceptual doc | Explains trust model and threat without code-first distraction |
| Verify signatures in Node.js | How-to guide | User has a specific implementation task |
| Look up header names and errors | API/reference section | Precise lookup details need accuracy |
| Recover from failed verification | Troubleshooting page | Symptom and fix path differ from setup |
| Announce breaking change | Release notes | Users need impact and required action |

## Plan Row Pattern

```text
Doc: Verify webhook signatures in Node.js
Type: How-to guide
Audience: Backend engineer integrating hosted payments
Goal: Verify signature locally and reject invalid payloads
Source of truth: SDK example test + security owner review
Owner: Developer docs
Reviewers: SDK maintainer, security engineer
Blocks: Final header name and error code
Success signal: Fewer support tickets about failed webhook verification
```

## Split Decision

Weak plan: One long "Webhooks" page with overview, setup, API fields, errors, migration notes, and all language samples.

Better plan:

- Overview: what webhooks are and when to use them.
- How-to guides: verify signatures by supported language.
- Reference: event schema and delivery behavior.
- Troubleshooting: common delivery and verification failures.
- Release notes: behavior changes and required user action.
