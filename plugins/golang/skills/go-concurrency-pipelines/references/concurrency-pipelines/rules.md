# Concurrency Pipeline Rules

## Construction

- Keep stages synchronous first; add goroutines at measured concurrency boundaries.
- Declare result order, partial-result behavior, and fail-fast versus aggregate errors.
- Declare panic policy: recover at an intentional boundary, convert to a
  classified failure, or let the process fail; never silently lose a worker.
- Use directional channel types at stage boundaries.
- Defer release of semaphore tokens and other owned resources.
- Stop tickers explicitly and release derived contexts.

## Cancellation and Completion

- Select on cancellation around blocking sends and receives.
- Stop admitting new work after cancellation.
- Wait for admitted work according to the documented drain policy.
- Ensure early consumer exit cannot strand upstream stages.
- Join every goroutine the operation creates before returning when ownership requires it.
- Keep one serializer for non-concurrent sinks such as `http.ResponseWriter`.

## Buffers and Fan-Out

- Size buffers from a documented burst or memory budget.
- Keep worker counts configurable and bounded.
- Preserve order deliberately; completion order is not input order.
- Prevent retries from exceeding the operation's total concurrency budget.

## Verification

- Test zero work, one item, full capacity, blocked downstream, early stop, and cancellation.
- Test worker errors and panics according to the public contract.
- Measure maximum active work with synchronization, not sleeps.
- Run `go test -race` on exercised concurrent paths.
- Treat a clean race run as evidence, not proof of leak or race freedom.
