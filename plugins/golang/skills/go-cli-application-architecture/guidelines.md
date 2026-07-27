# Go CLI Application Architecture Guidelines

## Workflow

| Task | Workflow |
|---|---|
| Design a new CLI or untangle an existing one | `workflows/design-application-boundaries.md` |

## By Symptom

| Symptom | Load |
|---|---|
| Cobra command contains API and storage logic | `references/application-architecture/rules.md` |
| Tests require global mutation | `references/application-architecture/examples.md` |
| Interfaces package imports everything | `references/application-architecture/knowledge.md` |
| Config reload mutates shared globals | `references/application-architecture/rules.md` |
| Repository abstraction has dozens of methods | `references/application-architecture/examples.md` |

## Decision

```text
Does code describe CLI syntax or rendering?
├─ yes → command adapter
└─ no
   ├─ coordinates a user action → application service
   ├─ enforces core invariant → domain/core package
   └─ talks to network, disk, process, clock → adapter behind a narrow seam
```

## File Index

| File | Purpose |
|---|---|
| `references/application-architecture/knowledge.md` | Layers and dependency direction |
| `references/application-architecture/rules.md` | Package and construction rules |
| `references/application-architecture/examples.md` | Practical Go patterns |
