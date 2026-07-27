# Design Cancellable Pipeline Workflow

1. Define the sequential operation and caller-visible contract.
2. Mark the stages that benefit from overlap.
3. Assign goroutine, channel, timer, and closure ownership.
4. Set worker, queue, retry, result, and memory bounds.
5. Add cancellation to every blocking edge.
6. Define error, partial-result, ordering, and drain behavior.
7. Implement completion and joining before tuning buffers.
8. Verify success, failure, cancellation, blocked consumers, and early exit.

## Exit Criteria

- [ ] Every goroutine has an owner and completion path.
- [ ] Every queue and concurrency dimension is bounded.
- [ ] Early stop cannot strand a sender.
- [ ] The public contract states ordering and partial-result behavior.
