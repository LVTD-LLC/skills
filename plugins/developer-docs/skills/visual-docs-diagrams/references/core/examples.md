# Visual Docs Examples

Use these examples as decision patterns.

## Screenshot Decision

Scenario: The doc tells users to switch a dashboard from live mode to test mode.

Good visual choice:

- Use a focused screenshot only if the toggle is hard to locate.
- Annotate the toggle.
- Keep the exact instruction in body text.
- Add alt text that explains the relevant UI state.

Bad visual choice:

- A full-page dashboard screenshot with no annotation.
- Instructions embedded only in the screenshot.

## Diagram Type Decision

Scenario: Explain webhook delivery.

| Need | Visual |
|------|--------|
| Show app, API, queue, and user server relationships | Boxes-and-arrows diagram |
| Show request, retry, success, and failure path | Flowchart |
| Show which team owns each delivery step | Swimlane |

## Maintenance Note Pattern

```text
Source: docs/diagrams/webhook-delivery.excalidraw
Export: docs/assets/webhook-delivery.svg
Update trigger: webhook retry policy, dashboard label, or event schema changes
Owner: Developer docs
```
