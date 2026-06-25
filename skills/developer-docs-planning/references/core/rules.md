# Documentation Planning Rules

Use these rules when deciding what developer documentation to create.

## Core Rules

1. **Choose by user task** - Match content type to what the reader is trying to do.
2. **Use one primary purpose per doc** - Split or route when a doc tries to teach, reference, troubleshoot, and announce at once.
3. **Plan source of truth early** - API fields, generated references, release notes, and code samples need owners and authoritative sources.
4. **Make prerequisites explicit** - Setup, access, version, plan, permission, and environment requirements belong in the plan.
5. **Separate learning from lookup** - Tutorials and concepts teach; references and changelogs support precise lookup.
6. **Keep plans lightweight** - Use enough structure to reveal gaps, dependencies, and owners.
7. **Flag product complexity** - If the doc outline requires too many caveats or branches, surface product or UX complexity rather than hiding it.
8. **Plan maintenance** - Every doc needs an owner, review signal, or source that keeps it accurate.

## Content-Type Selection

| Reader Need | Prefer |
|-------------|--------|
| "Can I use this?" | Overview or getting started |
| "How does this concept work?" | Conceptual doc |
| "Teach me the path once" | Tutorial |
| "Help me complete this task" | How-to guide |
| "What does this parameter mean?" | Reference |
| "This failed" | Troubleshooting |
| "What changed?" | Changelog or release notes |

## Red Flags

- The plan follows internal component order rather than user workflow.
- No one can say which doc answers the first user question.
- Reference details will be copied manually from code or schemas.
- Release notes omit impact or action required.
- Troubleshooting docs become a sprawling FAQ without symptoms or fixes.
