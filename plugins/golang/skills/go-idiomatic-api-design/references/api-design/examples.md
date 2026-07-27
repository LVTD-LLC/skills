# API Design Examples

## Consumer-Owned Interface

```go
// package report
type UserFinder interface {
    FindUser(context.Context, string) (User, error)
}

type Service struct {
    users UserFinder
}
```

The storage provider remains concrete. The report package owns only the
operation it consumes.

## Concrete Provider with Optional Capability

```go
type Store struct {
    // unexported state
}

func (s *Store) Load(ctx context.Context, key string) ([]byte, error) {
    // ...
}

type Flusher interface {
    Flush(context.Context) error
}
```

Callers that need flushing can test for the optional behavior without forcing
all stores to implement an oversized interface.

## Executable Documentation

```go
func ExampleParseMode() {
    mode, err := ParseMode("safe")
    fmt.Println(mode, err)
    // Output:
    // safe <nil>
}
```

Avoid network access, current time, random map order, and process exits in
examples.
