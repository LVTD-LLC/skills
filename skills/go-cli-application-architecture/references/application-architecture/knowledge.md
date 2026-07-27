# Application Architecture Knowledge

## Boundary Model

- **Command adapter**: parse flags and operands, invoke one application action,
  render a result, and translate usage failures.
- **Application service**: coordinate a use case through domain logic and ports.
- **Core/domain**: types and invariants independent of Cobra, HTTP, files, and terminals.
- **Adapter**: implement a port using an API, filesystem, process, database, or clock.
- **Composition root**: load validated settings, construct concrete dependencies,
  build the command tree, and own lifecycle cleanup.

Dependencies point inward: outer adapters may import application/core packages;
core code must not import the CLI framework or concrete infrastructure.

## Interface Ownership

Define a narrow interface in or near the consuming package. This keeps the seam
shaped by the caller's need and lets concrete types satisfy it implicitly.
Concrete adapters need not declare or own every interface they may satisfy.

## Configuration vs State

Configuration describes how the process should run and is normally validated
once before use. Mutable state is application data with consistency, concurrency,
and persistence semantics. Treating both as a global map makes reloads unsafe and
obscures ownership.

## Proportional Structure

A small CLI may need only `main`, a command factory, and a runner. Introduce
application services or ports when there is reusable behavior, a difficult
effect boundary, or multiple adapters—not to imitate a generic architecture diagram.
