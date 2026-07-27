# Benchmark Code Workflow

## Steps

1. **Define** the user-visible metric, representative input, and acceptable noise.
2. **Prove correctness** with ordinary tests before benchmarking.
3. **Construct** a benchmark with controlled setup and realistic work.
4. **Baseline** with repeated samples and preserved raw output.
5. **Change** one mechanism based on a stated hypothesis.
6. **Compare** repeated samples with `benchstat`.
7. **Validate** correctness and the end-to-end workload again.

## Exit Criteria

- [ ] Commands, workload, environment, and toolchain are recorded.
- [ ] Raw before/after samples are preserved.
- [ ] The result is statistically and practically meaningful.
- [ ] Correctness and user-visible performance still hold.
