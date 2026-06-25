# Editing Review Examples

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
