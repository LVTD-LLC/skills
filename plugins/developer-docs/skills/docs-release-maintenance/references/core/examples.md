# Docs Release Maintenance Examples

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
