# HTTP Client Resilience Knowledge

## Budget Model

The caller owns a total context deadline. Connection, TLS, response-header, and
per-attempt limits must fit inside it. Retries consume the same total budget,
including backoff and body processing. A client-wide timeout can provide a
backstop, but operation contexts express the real work boundary.

## Failure Classes

- **Transport**: DNS, connect, TLS, socket, or protocol failure.
- **Cancellation/timeout**: caller canceled or a deadline expired.
- **HTTP status**: server returned a complete response with application meaning.
- **Decode/protocol**: response shape, content type, or framing is invalid.
- **Local policy**: body too large, redirect rejected, or retry budget exhausted.

Preserve the underlying cause and include bounded context such as operation,
method, host, status, and request ID.

## Client Lifecycle

`http.Client` and `http.Transport` are safe for concurrent reuse and should
normally live for the application lifetime. Reusing them enables connection
pooling. Response bodies must be closed. Reading to EOF when reasonable can
allow reuse, but error bodies must still be size-limited.

## Retry Safety

Safe retries require a transient failure plus an idempotent operation or a
server-supported idempotency key. Respect `Retry-After`, add jitter, cap attempts
and delays, and stop on context cancellation. A retry policy is part of the
operation contract, not generic middleware applied blindly.

## Pagination

Track next cursors explicitly, detect repeated cursors, cap pages or records,
and share the total context budget. Return partial results only when the public
contract states how callers can recognize and resume them.

Prefer opaque cursor parameters. Validate the scheme and origin of any absolute
next URL before reusing authentication. Close each page body before the next
request. Retrying a page must not append its records twice.
