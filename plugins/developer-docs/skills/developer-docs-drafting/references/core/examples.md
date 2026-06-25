# Developer Docs Drafting Examples

Use these examples as revision patterns.

## Title Revision

Weak:

```text
Webhook Signatures
```

Better:

```text
Verify webhook signatures in Node.js
```

Why it works: The stronger title names the action, object, and implementation context.

## Procedure Step Revision

Weak:

```text
1. Install the package and set your API key, then run the server.
```

Better:

```text
1. Install the package:
   npm install @example/webhooks
2. Set `EXAMPLE_API_KEY` to your test API key.
3. Start the local server:
   npm run dev
```

Why it works: Each step has one action, and commands are easy to copy.

## Callout Decision

Weak:

```text
Note: You need Node.js 20 or later.
```

Better:

```text
Prerequisite: Node.js 20 or later.
```

Why it works: Required setup belongs in the main path, not a note.

## Skimmable Outline Pattern

```text
# Verify webhook signatures in Node.js
## Before you begin
## Install the SDK
## Configure the signing secret
## Verify incoming requests
## Test a valid webhook
## Troubleshoot failed verification
```
