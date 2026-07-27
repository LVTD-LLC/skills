---
name: go-cli-command-design
description: Design and review predictable Go command-line interfaces with explicit flags, operands, stdin, environment precedence, stdout and stderr contracts, help, errors, exit codes, dependency injection, and platform behavior. Use when creating a Go CLI, changing its public command contract, making command code testable, or reviewing script and agent compatibility.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Go CLI Command Design
  category: Go
  tags: go,golang,cli,command-design,flags,streams,portability
---

# Go CLI Command Design

Design the command as a public interface before treating it as an implementation.
Keep results pipeable, failures diagnosable, and process-global state at the edge.

## Core Workflow

1. State the command purpose, invocation syntax, callers, and compatibility promises.
2. Assign each input to a flag, operand, stdin, environment, or config source.
3. Define precedence, validation, conflicts, defaults, and blocking behavior.
4. Reserve stdout for results and requested help; use stderr for diagnostics,
   invalid-usage help, and progress.
5. Return errors from command logic and map exit codes at the process boundary.
6. Inject streams, configuration, and effects behind a small testable runner.
7. Verify help, invalid usage, operational failures, and supported target behavior.

## Read Next

| Task | Load |
|---|---|
| Design or change a complete command contract | `guidelines.md`, `workflows/design-command-interface.md` |
| Implement flags, streams, environment, or errors | `references/command-interface/rules.md`, `references/command-interface/examples.md` |
| Understand the design rationale | `references/command-interface/knowledge.md` |
| Review an existing command | `references/command-interface/checklist.md` |

## Guardrails

- Prefer a dedicated `flag.FlagSet` over package-global flags in reusable code.
- Do not read stdin unless the documented invocation requires it.
- Do not call `os.Exit` below the outer process boundary.
- Treat structured output, exact text, and exit codes as APIs when automation relies on them.
- Cross-compilation does not replace target-level smoke testing.

## Source Notes

Guidance is transformed and paraphrased from Ricardo Gerardi,
*Powerful Command-Line Applications in Go* (Pragmatic Bookshelf, 2021),
especially Chapters 1-2. Examples are original adaptations.

Book: https://pragprog.com/titles/rggo/powerful-command-line-applications-in-go/

Modern API details should be verified against https://pkg.go.dev/flag and the
current Go documentation before implementation.
