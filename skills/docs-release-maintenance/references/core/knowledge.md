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

## Rules And Checks

Use these rules when publishing, maintaining, deprecating, or deleting developer docs.

## Core Rules

1. **Plan docs with the code change** - Include docs in release planning, not as post-release cleanup.
2. **Analyze user impact** - Identify who is affected, what changes, and what action they must take.
3. **Require appropriate review** - Use peer, technical, security, legal, or product review based on risk.
4. **Test before publishing** - Check links, examples, generated refs, screenshots, and release-specific facts.
5. **Publish where users will look** - Delivery location should match user behavior and product entry points.
6. **Announce material changes** - Users need to know when docs explain new, changed, or breaking behavior.
7. **Assign ownership** - Critical docs need owners, metadata, or CODEOWNERS-style review.
8. **Automate known toil** - Use freshness reminders, link checks, linters, and generators where the process is clear.
9. **Deprecate before deleting when users need time** - Provide warning, alternatives, migration guide, and timeline.
10. **Redirect removed content** - Preserve user paths and search behavior where possible.

## Release Checklist

| Area | Check |
|------|-------|
| Scope | Affected docs and user actions identified |
| Review | Technical and editorial reviewers assigned |
| Testing | Links, samples, screenshots, and generated refs checked |
| Approval | Final approver named |
| Delivery | Publish location and timing confirmed |
| Announcement | Release notes or comms include impact and action |
| Maintenance | Owner and update trigger recorded |

## Red Flags

- Docs are blocked on facts no one owns.
- Release notes say what changed but not who is affected.
- A stale page is deleted without redirect or alternative.
- Generated API docs are trusted without usability review.
- Automation is proposed before handoffs and failure modes are understood.


## Examples And Patterns

Use these examples as lifecycle planning patterns.

## Release Plan Row

```text
Change: Webhook signature verification becomes required for production endpoints
Affected docs: Webhook overview, Node.js verification guide, API errors, release notes
User impact: Existing integrations must verify signatures before July 15
Reviewers: API owner, security reviewer, developer docs
Tests: Run Node.js sample, check error response, verify dashboard label
Announcement: Release notes and migration guide
Owner after launch: Developer docs with API CODEOWNER review
```

## Freshness Metadata Pattern

```text
Owner: docs-platform
Source of truth: openapi/payments.yaml
Review trigger: API schema change, SDK major release, or quarterly freshness check
Last reviewed: 2026-06-25
```

## Deprecation Plan Pattern

```text
Content: Legacy webhook signing guide
Reason: Replaced by current signature verification flow
User risk: Existing integrations may still use old signing header
Action: Add deprecation notice, link migration guide, announce in release notes
Deletion timing: After support window ends
Redirect: /docs/webhooks/legacy-signing -> /docs/webhooks/signatures
```
