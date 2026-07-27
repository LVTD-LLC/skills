# Investigate Performance Workflow

## Steps

1. Reproduce the symptom with a representative workload.
2. Separate CPU, allocation, retained-memory, blocking, contention, and I/O hypotheses.
3. Capture the least intrusive profile that can distinguish them.
4. Inspect flat and cumulative costs plus relevant source.
5. Make one bounded change at the measured bottleneck.
6. Rerun the profile, benchmark, correctness suite, and representative workflow.

## Common Mistakes

- Profiling a tiny workload that never reaches steady state.
- Reading allocation-space as retained memory.
- Optimizing the hottest function when its caller is avoidable.
- Reporting percentage gains without absolute user-visible impact.
