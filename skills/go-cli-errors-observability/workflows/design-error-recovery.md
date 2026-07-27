# Design Error Recovery Workflow

## Steps

1. [ ] Inventory invalid input, dependency, conflict, cancellation, and defect cases.
2. [ ] Assign programmatic types or causes without coupling to prose.
3. [ ] Write one concise message and one recovery action per recoverable class.
4. [ ] Define exit or structured error mapping at the process boundary.
5. [ ] Decide what context is safe in normal and debug modes.
6. [ ] Test cause preservation, mapping, messages, and stream placement.

## Exit Criteria

- [ ] Callers can distinguish actionable classes without parsing prose.
- [ ] Users receive enough context to recover without exposing sensitive detail.
