---
name: go-idiomatic-api-design
description: Design and review stable, idiomatic Go package APIs covering package naming, exported declarations, documentation, zero values, method sets, concrete types, consumer-owned interfaces, standard interfaces, errors, compatibility, and executable examples. Use when creating a reusable Go package, reviewing its public surface, evolving an exported API, or deciding between concrete types, functions, methods, fields, and interfaces.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Go Idiomatic API Design
  category: Go
  tags: go,golang,api-design,packages,interfaces,compatibility
---

# Go Idiomatic API Design

Design from the caller's code inward. Prefer the smallest coherent public
surface that preserves invariants and can evolve without needless interfaces.

## Core Workflow

1. Identify callers, supported operations, and compatibility constraints.
2. Sketch realistic call sites before choosing exported names or types.
3. Keep packages cohesive and names clear without package-name stutter.
4. Prefer concrete provider APIs; define narrow interfaces at consumers.
5. Decide zero-value, mutation, copying, concurrency, and error contracts.
6. Integrate standard interfaces only when their semantics truly match.
7. Prove the public surface with external tests and executable examples.
8. Review the change for accidental compatibility commitments.

## Read Next

| Task | Load |
|---|---|
| Design or evolve an API | `guidelines.md`, `workflows/review-public-api.md` |
| Choose types, fields, methods, or interfaces | `references/api-design/rules.md` |
| Understand compatibility and method sets | `references/api-design/knowledge.md` |
| Review concrete patterns | `references/api-design/examples.md` |

## Guardrails

- Do not export a field merely to avoid writing behavior.
- Do not define a provider-wide interface as a mirror of its methods.
- Do not accept an interface before a real consumer requires substitution.
- Do not use a standard interface when its conventional semantics are surprising.
- Do not claim conformance assertions prove behavior.
- Check the module's Go language version before giving version-sensitive advice.

## Source Notes

Guidance is transformed and paraphrased from Inanc Gumus, *Go by Example:
Programmer's Guide to Idiomatic and Testable Programs* (Manning, 2025),
especially Chapters 1, 2, 5, 9, and 10. Examples are original.

Book: https://www.manning.com/books/go-by-example

Current language and documentation contracts should be verified against
https://go.dev/ref/spec, https://go.dev/doc/comment, and the module's pinned Go
version.
