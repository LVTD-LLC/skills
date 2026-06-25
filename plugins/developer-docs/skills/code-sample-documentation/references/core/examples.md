# Code Sample Examples

Use these examples as patterns for improving samples.

## Placeholder Revision

Weak:

```bash
curl https://api.example.com/widgets/foo
```

Better:

```bash
curl https://api.example.com/widgets/wdg_12345 \
  -H "Authorization: Bearer $EXAMPLE_API_KEY"
```

Why it works:

- The ID looks like the product's real resource format.
- The required auth header is visible.
- The placeholder uses an environment variable with a clear name.

## Request And Response Pair

```http
POST /v1/widgets
Authorization: Bearer $EXAMPLE_API_KEY
Content-Type: application/json

{"name":"Launch checklist"}
```

```json
{
  "id": "wdg_12345",
  "name": "Launch checklist",
  "status": "active"
}
```

Review checks:

- Response fields match the request.
- IDs and enum values are realistic.
- Required headers are included.
- Sensitive values are placeholders.

## Limitation Note

```text
This example omits retry handling so the signing flow is easier to see. Add retries before using this pattern in production.
```

Use notes like this when the simplification is intentional and could otherwise mislead readers.
