# API Design Rules

## Packages and Names

- Give each package one coherent purpose.
- Choose names that read clearly at the call site.
- Avoid package-name stutter and vague packages such as `utils`.
- Document every exported declaration and the package itself.

## Types and State

- Prefer a useful, safe zero value when practical; otherwise require a constructor.
- Keep fields private when they protect invariants, synchronization, or evolution.
- Document whether values may be copied and whether methods are concurrency-safe.
- Use pointer receivers for mutation, identity, locks, or large values.

## Functions, Methods, and Interfaces

- Use a method when behavior belongs to the receiver's domain.
- Use a function when no receiver naturally owns the operation.
- Start concrete and extract an interface only at a substitution boundary.
- Compare an options struct, functional options, and a configured concrete type
  from caller code rather than defaulting to one fashionable pattern.
- Put consumer interfaces beside the consumer.
- Keep optional capability interfaces narrow and behaviorally meaningful.

## Errors

- Return errors last and preserve causes with `%w` when callers need inspection.
- Document stable error identities or types; do not expose driver details by accident.
- Keep error messages useful but do not make callers parse prose.

## Verification

- Add external tests for exported behavior.
- Add executable examples for the most important call sites.
- Verify standard-interface behavior, not merely method presence.
- Run API compatibility tooling when a published module evolves.
- Treat variadic parameter additions as signature changes during compatibility review.
