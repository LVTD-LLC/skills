# Concurrency Pipeline Knowledge

## API Before Topology

Concurrency is an implementation choice unless the caller must coordinate a
stream. Prefer `[]T`, `(T, error)`, or `iter.Seq`/`iter.Seq2` when they preserve
the contract. Exposed channels commit callers to receiving, closure, ordering,
and cancellation semantics.

## Ownership

The goroutine that completes all sends owns closing its outbound channel.
Receivers do not close channels they do not own. A coordinator may close a
fan-in channel only after every forwarding goroutine has stopped.

For a worker pool, a coordinator owns admission and final output closure.
Workers do not close shared result channels. A separate wait path closes the
result channel only after every admitted worker exits.

## Backpressure and Bounds

An unbuffered channel couples producer progress to a consumer. A bounded buffer
absorbs a known burst; it does not remove backpressure. Bound active workers,
queued work, retries, result buffering, and retained payload size as one budget.

## Cancellation

Propagate `context.Context` as the first parameter. Every potentially blocking
stage must observe cancellation. Preserve diagnostic causes when useful, but
keep `context.Canceled` and `context.DeadlineExceeded` inspectable.

Cancellation is cooperative. A work function that ignores context can prevent
prompt shutdown; give such work an isolating process, transport timeout, or
other enforceable boundary when deadlines are mandatory.

## Iterators

`iter.Seq` supports push-style streaming and early stop through `yield(false)`.
When converting with `iter.Pull`, call `stop` if consumption ends early. Do not
call pull functions concurrently.

## Testing

Use barrier channels to establish ordering points. Assert invariants such as
maximum concurrency, completion, cancellation, and result sets without
depending on incidental scheduling order.
