# Concurrency Pipeline Examples

## Cancellation-Aware Stage

```go
func mapStage[A, B any](
    ctx context.Context,
    in <-chan A,
    fn func(context.Context, A) (B, error),
) <-chan result[B] {
    out := make(chan result[B])
    go func() {
        defer close(out)
        for v := range in {
            mapped, err := fn(ctx, v)
            select {
            case out <- result[B]{value: mapped, err: err}:
            case <-ctx.Done():
                return
            }
            if err != nil {
                return
            }
        }
    }()
    return out
}
```

The operation owning this stage must also cancel and join the complete topology.

## Deterministic Concurrency Check

Inject a work function that blocks on a release channel. Count admitted workers,
wait until the expected limit is reached, assert that no additional worker
starts, then release them. This proves the bound without guessing a duration.
