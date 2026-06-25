# Docs Feedback Examples

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
