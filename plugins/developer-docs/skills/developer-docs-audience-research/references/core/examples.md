# Audience Research Examples

Use these examples as compact patterns, not as fixed templates.

## Weak Audience Definition

> Audience: developers using the API.

Problems:

- No task or success outcome.
- No skill level or environment.
- No constraints, blockers, or evidence.

## Better Audience Definition

> Primary audience: backend engineers adding hosted payments to an existing Node.js checkout. They know HTTP APIs and npm, but may not know our auth model, webhook signing, or test-mode dashboard. Their first success is a local payment flow that creates a test charge and handles the success webhook.

Why it works:

- Names the role, task, stack, prior knowledge, missing concepts, and first outcome.

## User Story Pattern

```text
As a backend engineer integrating hosted payments,
I want a minimal checkout flow with webhook verification,
so that I can prove the integration works before touching production.
```

## Friction Log Entry Pattern

```text
Step: Create test API key
Expected: Key is visible in dashboard after selecting test mode
Observed: Dashboard defaults to live mode and the docs do not mention the toggle
Impact: User may copy a live key or think the setup failed
Doc fix: Add prerequisite step and screenshot annotation near setup instructions
```
