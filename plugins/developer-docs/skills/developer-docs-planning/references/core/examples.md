# Documentation Planning Examples

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
