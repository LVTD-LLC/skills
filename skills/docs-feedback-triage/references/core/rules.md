# Docs Feedback Triage Rules

Use these rules when collecting or triaging developer documentation feedback.

## Core Rules

1. **Capture page and context** - Feedback should preserve URL, section, user goal, and what was wrong or missing.
2. **Validate before fixing** - Check whether the issue is current, reproducible, and relevant.
3. **Route non-doc issues** - Product bugs, pricing confusion, permissions, or policy problems need the right owner.
4. **Make feedback actionable** - Ask for expected behavior, actual behavior, reproduction steps, and possible fix when useful.
5. **Deduplicate** - Search existing issues before creating new work.
6. **Prioritize by user impact** - Blocked users, broken setup, and wrong technical details outrank polish.
7. **Separate trend from anecdote** - One report may be urgent, but patterns change roadmap priority.
8. **Follow up** - Respond when users provided useful detail or when a fix ships.

## Priority Rubric

| Priority | Use When |
|----------|----------|
| P0 | Docs cause serious harm, outage response confusion, security risk, or widespread blocking failure |
| P1 | Many users are blocked, setup fails, or docs are technically wrong for important workflows |
| P2 | Confusion affects a meaningful segment but has workaround |
| P3 | Minor clarity, formatting, typo, or low-impact improvement |

## Red Flags

- Feedback has no page URL, product version, or user goal.
- The proposed fix is a product request disguised as a docs bug.
- A stale issue stays open because no one decided whether it is valid.
- The triage process ignores support-ticket patterns.
- Users never hear back after reporting high-quality issues.
