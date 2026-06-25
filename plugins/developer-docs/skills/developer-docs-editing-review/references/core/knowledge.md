# Editing Review Knowledge

Editing developer docs is a quality pass on both information and reader flow. It should test whether the doc works, not only whether the prose sounds polished.

Source basis: *Docs for Developers*, Chapter 4, "Editing documentation."

## Editing Passes

| Pass | Checks |
|------|--------|
| Technical accuracy | Facts, code, commands, UI labels, API details, outputs, warnings |
| Completeness | Prerequisites, missing steps, supported versions, next steps, recovery paths |
| Structure | Title, headings, order, templates, prerequisites, links, next steps |
| Clarity | Ambiguous phrasing, unexplained terms, hidden assumptions, hard-to-follow steps |
| Brevity | Duplication, irrelevant background, bloated sentences, unnecessary caveats |

## Review Types

- **Self-review**: The author checks structure, flow, and obvious gaps before asking others.
- **Peer review**: Another writer or teammate checks usability and clarity.
- **Technical review**: A subject-matter expert verifies facts, examples, and implementation details.

## Feedback Integration

Review comments are inputs, not commands. Resolve conflicts by returning to the reader goal, source of truth, risk, and evidence.

## Common Misconceptions

- **Myth**: Editing means fixing grammar at the end.
  **Reality**: Accuracy, completeness, and structure usually matter more.
- **Myth**: Accepting every reviewer suggestion is safest.
  **Reality**: Blindly accepting feedback can create inconsistency or drift from user needs.
- **Myth**: Technical review can happen after publish.
  **Reality**: High-risk procedures and examples need validation before release.

## Rules And Checks

Use these rules when editing or reviewing developer documentation.

## Core Rules

1. **Edit in passes** - Accuracy, completeness, structure, clarity, and brevity catch different failures.
2. **Verify runnable claims** - Commands, procedures, examples, links, and outputs need evidence or a clear limitation.
3. **Check prerequisites before first action** - Missing setup blocks readers even when later steps are correct.
4. **Prioritize reader risk** - Data loss, security exposure, failed commands, and broken setup outrank style issues.
5. **Use source-of-truth review** - Route API, SDK, UI, security, legal, and release facts to the right owner.
6. **Keep structure aligned to goal** - Title, headings, order, and next steps should support the doc's purpose.
7. **Cut duplication and vague language** - Remove repeated ideas, inconsistent terms, idioms, and biased wording.
8. **Request specific feedback** - Ask reviewers to check named sections, claims, examples, or risks.
9. **Resolve conflicts through user need** - When comments disagree, choose the option that best serves the target reader.

## Risk Order

| Priority | Examples |
|----------|----------|
| Highest | Security, privacy, data loss, irreversible operations |
| High | Broken commands, incorrect API details, missing prerequisites |
| Medium | Confusing order, missing context, weak troubleshooting |
| Lower | Style preferences, minor wording, formatting polish |

## Red Flags

- A procedure has not been executed or simulated.
- The doc includes "just", "simply", or other language that hides complexity.
- Review comments ask for broad "looks good?" feedback.
- Multiple terms describe the same product concept.
- The doc has no next step, expected result, or recovery path.


## Examples And Patterns

Use these examples to shape review output and feedback.

## Review Finding Pattern

```text
Finding: The setup section never states that webhook signing requires API version 2025-01 or later.
Risk: Users on older accounts will follow the guide and receive an unsupported-header error.
Evidence needed: Confirm version gate with API owner.
Fix: Add the version prerequisite before the first setup command and link to the migration guide.
```

## Specific Review Request

Weak:

```text
Can you review this?
```

Better:

```text
Can you verify the Node.js signature example, the expected error codes, and whether the dashboard label is still "Signing secret"?
```

## Feedback Integration

Scenario: One reviewer asks for a long architecture explanation in a how-to guide; another asks to keep the guide task-focused.

Resolution:

- Keep the how-to focused on the task.
- Add one short explanation only where it affects the user's decision.
- Link to a concept page for the full architecture.

## Clarity Rewrite

Weak:

```text
Simply configure the app with the appropriate credentials.
```

Better:

```text
Set `PAYMENTS_API_KEY` to a test-mode API key from the dashboard.
```
