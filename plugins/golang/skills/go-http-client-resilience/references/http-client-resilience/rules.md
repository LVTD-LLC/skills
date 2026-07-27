# HTTP Client Resilience Rules

## Construction

- Accept an `*http.Client` or narrow `Doer` dependency; do not hide global defaults.
- Reuse the client and transport across requests.
- Set transport phase limits appropriate to the environment.
- Define redirect policy intentionally, especially across hosts and credentials.

## Requests and Responses

- Build requests with `http.NewRequestWithContext`.
- Construct URLs with `net/url`; do not concatenate unescaped user input.
- Set authentication as late as practical and redact it everywhere.
- Treat pagination cursors as opaque. If an API returns an absolute next URL,
  require the expected scheme and origin before attaching credentials.
- Close every response body and bound reads with a known limit.
- Check status before decoding the success schema.
- Parse bounded structured error responses; fall back to sanitized status context.

## Retries

- Retry only enumerated transport failures and statuses.
- Never retry because JSON decoding failed unless the protocol explicitly makes it safe.
- Require idempotency for mutations and reuse the same idempotency key per logical operation.
- Apply exponential backoff with jitter, caps, attempt count, and total deadline.
- Honor valid `Retry-After` without exceeding the caller's budget.

## Observability and Tests

- Record operation, attempt, duration, status class, and request ID—not secrets or bodies.
- Inject a function-backed `RoundTripper` for unit tests.
- Use `httptest.Server` for integration behavior that depends on real HTTP semantics.
- Test cancellation, oversized bodies, retry exhaustion, `Retry-After`, and body closure.
- Test a malicious cross-origin next link, repeated cursor, empty page with a
  next cursor, page/record caps, and cancellation between pages.
