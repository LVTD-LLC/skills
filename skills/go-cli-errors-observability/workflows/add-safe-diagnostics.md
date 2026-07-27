# Add Safe Diagnostics Workflow

## Steps

1. [ ] Define the support question the evidence must answer.
2. [ ] Create an allowlist of fields and sources.
3. [ ] Exclude secrets, bodies, arbitrary environment values, and unrelated files.
4. [ ] Redact at collection and serialization boundaries.
5. [ ] Preview contents and obtain explicit collection consent.
6. [ ] In noninteractive mode, expose a machine-readable preview and require an
       explicit create flag; require a separate explicit upload action.
7. [ ] Create a new file exclusively with restrictive permissions; reject
       symlinks and unsafe archive paths and define overwrite policy.
8. [ ] Bound per-entry and total size, clean partial artifacts on cancellation,
       and provide a retention/deletion action.
9. [ ] Make upload a separate cancellable action with a visible destination.
10. [ ] Test seeded secrets never appear in the artifact or logs.

## Exit Criteria

- [ ] Every collected field has a stated diagnostic purpose.
- [ ] The user controls creation, inspection, and upload.
