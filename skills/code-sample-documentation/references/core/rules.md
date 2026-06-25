# Code Sample Rules

Use these rules when writing, reviewing, or testing documentation code samples.

## Core Rules

1. **State the sample purpose** - Explain what the reader will learn or accomplish.
2. **Classify the sample** - Executable and explanatory samples have different quality bars.
3. **Pair inputs with real outputs** - Request and response examples must match actual behavior.
4. **Make placeholders obvious** - Use descriptive placeholders and say how to replace them.
5. **Avoid meaningless values** - Prefer realistic IDs, names, and domains over `foo`, `bar`, or gibberish.
6. **Keep the sample focused** - If the explanation becomes long, simplify or split the sample.
7. **Follow language conventions** - Use idiomatic names, formatting, error handling, and package patterns.
8. **Mark limitations** - Identify test-only, beta, alpha, simplified, insecure, or non-production choices.
9. **Test what readers may run** - Run commands, snippets, API calls, or tests when feasible.
10. **Plan for drift** - Assign owner, source of truth, version, generator, or review cadence.

## Quick Checks

| Check | Question |
|-------|----------|
| Purpose | Why is this sample here? |
| Setup | Can the reader run it with stated prerequisites? |
| Inputs | Are IDs, keys, URLs, and payloads realistic and replaceable? |
| Outputs | Do responses, errors, and logs match real behavior? |
| Clarity | Are names and formatting idiomatic? |
| Safety | Could copy-paste cause harm in production? |
| Maintenance | Who or what keeps it current? |

## Red Flags

- The sample uses fake values without replacement instructions.
- Error messages are invented instead of copied from real output.
- A production-looking sample omits authentication, validation, or error handling.
- The sample demonstrates a clever trick rather than the recommended path.
- Multiple language tabs are created without maintenance owners.
