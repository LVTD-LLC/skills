# Documentation IA Examples

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
