# Performance Testing Knowledge

## Evidence Layers

Use the least expensive evidence that answers the question:

1. End-to-end timing for user-visible impact.
2. Package benchmarks for controlled comparison.
3. Allocation metrics for memory-pressure hypotheses.
4. CPU, heap, block, and mutex profiles for cost location.
5. Execution traces for scheduler, latency, and goroutine interactions.

Microbenchmarks isolate mechanisms but can misrepresent application impact.
Representative end-to-end workloads protect against optimizing the wrong path.

## Benchmark Semantics

On Go 1.24 and newer, `B.Loop` manages timed setup and cleanup and helps prevent
the loop body from being eliminated. It does not disable normal optimization.
Use the exact `for b.Loop()` form. Preserve a `b.N` pattern only for older
supported toolchains.

Use repeated samples and `benchstat`; one before/after line does not describe
noise or uncertainty. Compare on equivalent machines, power modes, workloads,
toolchains, and build flags.

## Profile Interpretation

CPU profiles sample active CPU work. Heap profiles can answer allocation-space
or in-use-space questions; state which one. Block and mutex profiles add
instrumentation cost. Flat cost belongs directly to a symbol; cumulative cost
includes callees.

## PGO

Profile-guided optimization needs representative CPU profiles. Production
profiles are preferable; a representative CLI workload can substitute when
production collection is impossible. Narrow microbenchmarks are usually poor
PGO inputs.
