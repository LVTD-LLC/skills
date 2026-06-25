# Developer Docs Drafting Knowledge

Good developer docs give readers a clear path through a task or concept. Structure matters because many readers skim, search, copy commands, and jump between sections.

Source basis: *Docs for Developers*, Chapter 3, "Drafting documentation."

## Drafting Components

| Component | Purpose |
|-----------|---------|
| Title | States the reader goal or content purpose |
| Opening | Sets context, audience, prerequisites, and outcome |
| Outline | Orders ideas before prose hardens |
| Headings | Let readers scan and recover their place |
| Paragraphs | Explain context and decisions in short units |
| Procedures | Guide actions in a numbered sequence |
| Lists | Group related items for scanning |
| Callouts | Surface exceptional warnings, cautions, or notes |
| Templates | Make repeated doc types faster and more consistent |

## Procedures

Procedures work best when they include:

- Starting state.
- Numbered steps.
- One main action per step.
- Required inputs or commands.
- Expected result or verification.
- Next step or recovery route.

## Skimming

Readers often scan before committing. Put important information early, use specific headings, break large blocks, and avoid hiding required details in notes or long paragraphs.

## Common Misconceptions

- **Myth**: Drafting starts with prose.
  **Reality**: A short outline often prevents missing steps and bad order.
- **Myth**: Callouts make important information more visible.
  **Reality**: Overused callouts train readers to ignore them.
- **Myth**: Longer explanations are always more helpful.
  **Reality**: Unfocused detail can block the task.

## Rules And Checks

Use these rules when writing or rewriting developer documentation.

## Core Rules

1. **Use one primary goal per doc** - A page can support secondary needs, but one goal should control title, order, and depth.
2. **Make the title actionable or specific** - Prefer reader outcomes over internal feature names when possible.
3. **Outline before prose** - Check order, missing steps, prerequisites, and overload before drafting paragraphs.
4. **Put important information first** - Lead with outcome, prerequisites, warnings, or decision points that affect success.
5. **Write specific headings** - Headings should reveal what the section helps the reader do or understand.
6. **Keep paragraphs short** - Use paragraphs for context and reasoning, not for long procedural chains.
7. **Use numbered steps for ordered actions** - Use bullets for unordered options, requirements, or concepts.
8. **One action per step** - Split steps that ask the reader to do multiple independent things.
9. **End procedures with verification** - Tell readers how to know the action worked.
10. **Use callouts sparingly** - Reserve warnings and cautions for material that changes reader safety or success.

## Quick Reference

| Element | Check |
|---------|-------|
| Title | Names the goal or precise topic |
| Opening | Gives outcome, audience, and prerequisites |
| Heading | Skimmable and specific |
| Step | Actionable, atomic, and ordered |
| List | Grouped by one clear principle |
| Callout | Exceptional and not overloaded |
| Ending | Gives verification or next step |

## Red Flags

- A reader must read several paragraphs before learning what they will accomplish.
- Required setup is hidden after the first command.
- A numbered step contains "and" between unrelated actions.
- Headings are generic, such as "Overview" repeated across many pages.
- The doc has many notes but no clear path.


## Examples And Patterns

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
