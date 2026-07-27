# Performance Testing Rules

## Workload

- Define latency, throughput, memory, or allocation success before measuring.
- Use stable inputs that represent real data sizes and distributions.
- Include setup in the measurement only when users pay that setup cost.
- Keep external networks and shared services out of microbenchmarks.

## Benchmark Construction

- Prefer `for b.Loop()` on Go 1.24 or newer.
- Use subbenchmarks for meaningful input-size or strategy matrices.
- Use `b.ReportAllocs` or `-benchmem` for allocation hypotheses.
- Use `b.SetBytes` when throughput per input byte is meaningful.
- Use `B.RunParallel` only when measuring a genuinely parallel workload.
- Avoid logging, assertions, and one-time fixture construction in timed code.
- Benchmark construction separately from steady-state reuse when callers pay
  those costs differently.
- For pre-`B.Loop` toolchains, use the `b.N` loop and retain an observable
  result so the compiler cannot eliminate the work.

## Comparison

- Run repeated samples with identical commands and controlled conditions.
- Save raw output and compare with `benchstat`.
- Report magnitude, uncertainty, workload, toolchain, and command.
- Reject changes that improve a microbenchmark but degrade the real workflow.

## Profiling

- Profile a workload long enough to produce useful samples.
- Collect one intrusive profile type at a time when interactions matter.
- Inspect top, graph, and source views before changing code.
- Validate the hypothesis with a fresh benchmark after the change.
