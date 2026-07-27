# Performance Testing Examples

## Modern Benchmark

```go
func BenchmarkParse(b *testing.B) {
    input := strings.Repeat("key=value\n", 1_000)
    b.ReportAllocs()
    b.SetBytes(int64(len(input)))

    for b.Loop() {
        _, err := Parse(strings.NewReader(input))
        if err != nil {
            b.Fatal(err)
        }
    }
}
```

## Repeated Comparison

```text
go test -run=^$ -bench=BenchmarkParse -benchmem -count=10 ./parser > old.txt
# apply one change
go test -run=^$ -bench=BenchmarkParse -benchmem -count=10 ./parser > new.txt
benchstat old.txt new.txt
```

## Profile a Benchmark

```text
go test -run=^$ -bench=BenchmarkParse -cpuprofile=cpu.out ./parser
go tool pprof -top cpu.out
go tool pprof -top -cum cpu.out
go tool pprof -list=Parse cpu.out
```

Do not infer end-to-end improvement until the representative CLI workflow also
improves.

Collect interacting profile types in separate runs when accuracy matters.
For heap profiles, name the question explicitly:

```text
go tool pprof -sample_index=alloc_space -top mem.out
go tool pprof -sample_index=inuse_space -top mem.out
```
