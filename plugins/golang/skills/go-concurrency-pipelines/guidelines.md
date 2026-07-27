# Go Concurrency Pipelines Guidelines

| Situation | Load |
|---|---|
| New worker pool or pipeline | `workflows/design-cancellable-pipeline.md` |
| Blocked send or goroutine leak | `workflows/review-goroutine-lifecycle.md` |
| Flaky concurrency test | `workflows/test-concurrency-contract.md` |
| Public result API choice | `references/concurrency-pipelines/knowledge.md` |
| Buffer, close, fan-in, or ordering decision | `references/concurrency-pipelines/rules.md` |

## Boundary

- Use `go-cli-process-control` for OS processes, pipes, signals, and descendants.
- Use `go-http-client-resilience` for HTTP retries and transport policy.
- Use `go-cli-terminal-experience` for rendering and terminal restoration.
- Use this skill for in-process goroutine, channel, iterator, and backpressure behavior.
