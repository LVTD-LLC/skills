# Docs Feedback Knowledge

Documentation feedback comes from many channels and must be converted into work deliberately. A good triage process protects attention while preserving strong user signals.

Source basis: *Docs for Developers*, Chapter 8, "Gathering and integrating feedback."

## Feedback Channels

| Channel | Use |
|---------|-----|
| Page-level feedback | Capture specific page problems close to the user's experience |
| Support issues | Detect repeated confusion, missing prerequisites, or troubleshooting gaps |
| Sentiment signals | Monitor broad satisfaction but avoid over-interpreting without context |
| Surveys | Ask targeted questions and establish baselines |
| User councils | Learn from strategic users or early adopters |
| Issue trackers | Route actionable doc bugs through normal work systems |

## Triage Dimensions

| Dimension | Question |
|-----------|----------|
| Validity | Is the feedback real, current, and relevant? |
| Ownership | Is this a docs issue, product issue, support issue, or policy issue? |
| Actionability | Can someone reproduce, scope, and fix it? |
| Importance | How many users are affected and how severe is the impact? |
| Follow-up | Who should hear back, and what evidence is still needed? |

## Common Misconceptions

- **Myth**: Every feedback item should become a docs task.
  **Reality**: Some feedback belongs to product, support, or no action.
- **Myth**: Negative sentiment alone identifies the fix.
  **Reality**: Sentiment needs context, affected page, user goal, and cause.
- **Myth**: Surveys are easy because they are short.
  **Reality**: Bad survey design creates misleading data.

## Rules And Checks

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


## Examples And Patterns

Use these examples as templates for triage and issue creation.

## Page Feedback Issue Template

```text
Title: [Doc title] - [short problem]
Doc URL:
Section:
User goal:
What is wrong or missing:
Expected information:
Actual information:
Possible fix:
Product/version/context:
Reporter contact or channel:
```

## Triage Decision

Feedback:

```text
The webhook verification guide does not work. I keep getting "invalid signature."
```

Triage:

- Validity: Needs reproduction.
- Ownership: Likely docs or SDK sample.
- Actionability: Ask for language, SDK version, copied command, and whether the raw request body was modified.
- Priority: P1 if multiple support cases show the same failure; otherwise P2 until reproduced.
- Next action: Reproduce with published sample and compare error output.

## Non-Doc Routing

Feedback:

```text
The dashboard does not let me rotate signing secrets.
```

Decision:

- Route to product or support if the feature is missing or broken.
- Create a docs task only if docs claim the feature exists or fail to explain the current limitation.
