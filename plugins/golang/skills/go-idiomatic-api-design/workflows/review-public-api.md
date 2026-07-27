# Review Public API Workflow

Review an exported Go API from the caller's perspective before committing to it.

## Steps

### 1. Establish the contract

- [ ] Identify callers and supported operations.
- [ ] Record compatibility and minimum-Go-version constraints.
- [ ] Sketch representative call sites and failures.

### 2. Review the surface

- [ ] Check package cohesion and naming at call sites.
- [ ] Challenge every exported field, type, method, and error identity.
- [ ] Verify zero-value, copying, mutation, and concurrency behavior.
- [ ] Keep interfaces consumer-owned and minimal.

### 3. Prove behavior

- [ ] Add external tests for public behavior.
- [ ] Add deterministic examples for primary operations.
- [ ] Test standard-interface semantics.
- [ ] Run formatting, vetting, tests, and applicable compatibility checks.

## Exit Criteria

- [ ] Call sites are clear without unnecessary abstraction.
- [ ] Compatibility commitments are deliberate and documented.
- [ ] Tests prove behavior rather than only compilation.
