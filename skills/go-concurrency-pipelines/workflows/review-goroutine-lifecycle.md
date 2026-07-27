# Review Goroutine Lifecycle Workflow

For every goroutine, record:

- who starts it;
- what stops it;
- which resources it owns;
- which sends, receives, locks, or waits can block;
- who observes its error or panic;
- who waits for completion.

Trace success, first error, deadline, caller cancellation, panic, and consumer
abandonment. Reject any path that can return while an owned goroutine remains
blocked without an explicit background-lifetime contract.
