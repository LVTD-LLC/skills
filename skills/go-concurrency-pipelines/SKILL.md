---
name: go-concurrency-pipelines
description: Design, implement, test, and review bounded in-process Go concurrency using goroutines, channels, iterators, fan-out and fan-in, backpressure, ordering, cancellation, deadlines, error propagation, early consumer exit, and deterministic lifecycle checks. Use when building worker pools, streaming pipelines, concurrent batches, background stages, or diagnosing goroutine leaks, blocked sends, channel ownership, and shutdown races.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Go Concurrency Pipelines
  category: Go
  tags: go,golang,concurrency,goroutines,channels,pipelines
---

# Go Concurrency Pipelines

Every goroutine needs an owner, a stop condition, and a completion path. Bound
admission before optimizing throughput.

## Core Workflow

1. Define input, output, ordering, partial-result, and failure contracts.
2. Prefer a synchronous or iterator API unless callers need channel mechanics.
3. Assign ownership of goroutines, channel closure, timers, and cancellation.
4. Bound concurrency, queues, retries, and memory together.
5. Make every blocking send, receive, and wait cancellation-aware.
6. Join all owned goroutines on success, failure, cancellation, and early exit.
7. Test lifecycle behavior with barriers and deadlines rather than sleeps.
8. Run race checks and inspect leak-prone paths.

## Read Next

| Task | Load |
|---|---|
| Design a pipeline | `guidelines.md`, `workflows/design-cancellable-pipeline.md` |
| Review goroutine ownership | `workflows/review-goroutine-lifecycle.md` |
| Test concurrency deterministically | `workflows/test-concurrency-contract.md` |
| Choose channels, iterators, buffers, or ordering | `references/concurrency-pipelines/knowledge.md`, `references/concurrency-pipelines/rules.md` |
| Review patterns | `references/concurrency-pipelines/examples.md` |

## Guardrails

- Only a sender that owns completion closes a channel.
- Do not use a buffer as a substitute for cancellation and joining.
- Do not expose internal channels when an iterator or synchronous result suffices.
- Do not assume `select` guarantees fairness.
- Do not multiply a concurrency limit through hidden retries or nested fan-out.
- Do not prove timing behavior with arbitrary sleeps.

## Source Notes

Guidance is transformed and paraphrased from Inanc Gumus, *Go by Example:
Programmer's Guide to Idiomatic and Testable Programs* (Manning, 2025),
Chapters 6-7 and Appendix E. Examples are original.

Book: https://www.manning.com/books/go-by-example

Verify language and API behavior against https://go.dev/ref/spec,
https://pkg.go.dev/context, https://pkg.go.dev/iter, and
https://go.dev/doc/articles/race_detector.
