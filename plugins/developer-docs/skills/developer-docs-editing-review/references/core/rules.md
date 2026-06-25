# Editing Review Rules

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
