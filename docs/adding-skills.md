# Adding Skills

This repo is built so agents can add skills without hand-wiring every adapter.
The only canonical source for a skill is `skills/<skill-name>/`.

## Skill Directory

Create one directory per skill:

```text
skills/
  <skill-name>/
    SKILL.md
    references/
    workflows/
    scripts/
    assets/
    agents/
    evals/
    guidelines.md
```

Only `SKILL.md` is required. Add supporting files only when they make the skill
easier to use or keep the main instructions concise.

Use these conventions:

- `references/`: background material, source maps, API notes, schemas, or
  longer examples that should load only when needed.
- `workflows/`: task-specific playbooks that a skill links to for concrete
  procedures.
- `scripts/`: deterministic utilities that save the agent from rewriting the
  same code. Prefer runnable scripts when the operation is mechanical,
  validation-heavy, or error-prone.
- `assets/`: files used in outputs, such as icons, templates, or fixture media.
- `agents/openai.yaml`: optional UI metadata for skill lists and chips.
- `evals/`: optional pressure scenarios or validation cases for checking whether
  a skill works in realistic use.
- `guidelines.md`: shared rules or source-derived guidance used by multiple
  workflows in the same skill.

## Frontmatter Contract

Use lowercase hyphen-case for `name`, and make it match the directory name.
Marketplace plugin IDs are generated from the grouping rules in
`scripts/marketplace-utils.mjs`.

```yaml
---
name: example-skill
description: Use when doing a specific workflow that benefits from repeatable agent guidance.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.0"
  displayName: Example Skill
  category: Developer Tooling
  tags: example,workflow,agents
---
```

Rules enforced by validation:

- `name` must match the folder name.
- `description` must be useful and at least 40 characters.
- `metadata.version` must be `MAJOR.MINOR.PATCH` semver.
- `metadata.displayName`, `metadata.category`, and `metadata.tags` are required.
- Tags must be lowercase hyphen-case and cannot be duplicated.
- `metadata.tags` can be a comma-separated string or a YAML list.
- Display names should omit the `LVTD` prefix.
- `SKILL.md` must include a top-level Markdown heading.
- `SKILL.md` must use LF line endings.
- Executable files in `scripts/` must have an executable bit.

## Writing The Skill

Keep the first screen focused on when to use the skill and the workflow the
agent should follow. Move long examples, checklists, reference tables, and
provider-specific details to `references/` when they would bury the core
instructions.

Prefer deterministic scripts over prose for repeated mechanical checks. Keep
scripts local to the skill directory and document when the agent should run
them. Python scripts may be made runnable with `uv run` or an inline
`uv run --script` shebang when that improves portability or dependency
management, but do not force scripts into a skill when prose or existing tools
are clearer.

## Source Attribution

When a skill uses external source material, attribute it in the skill package.
This includes books, articles, posts, talks, libraries, framework docs, public
repos, plugins, and existing skills.

Keep attribution concise and useful:

- Name the source and author or organization.
- Link to the source when a stable public URL exists.
- For books or long-form sources, include title, author, and relevant chapters,
  sections, or durable topic references when helpful.
- State that guidance is transformed or paraphrased when the skill derives from
  copyrighted source material; do not copy long passages into the skill.
- Put source notes in `SKILL.md` when attribution helps users understand the
  skill immediately. For larger source maps, put them under `references/` and
  link to them from `SKILL.md`.

## Generated Artifacts

Do not edit these paths by hand:

```text
.claude-plugin/
.agents/plugins/
plugins/
dist/
```

Run this after changing any skill:

```bash
npm run build
```

The build regenerates:

- `dist/registry.json`
- `.claude-plugin/marketplace.json`
- `.agents/plugins/marketplace.json`
- `plugins/<plugin-name>/`

`dist/` is ignored. Marketplace artifacts under `.claude-plugin/`,
`.agents/plugins/`, and `plugins/` are committed so marketplace installs work
directly from GitHub.

The `lvtd-skills-router` skill should route from generated registry and
marketplace metadata instead of a hand-copied plugin list. When a skill changes
plugin membership, update `scripts/marketplace-utils.mjs`, run the build, and
let `dist/registry.json` describe the current catalog.

## Project-Installed Helper Skills

Project-local helper skills used by agents working in this repository live under
`.agents/skills/`.

Install or update these copies with the `skills` CLI rather than editing them by
hand:

```bash
skills add /path/to/skill --skill <skill-name> --copy -y
```

The CLI may create `skills-lock.json` for project installs. Do not commit that
lockfile for local-only sources because it records machine-local source paths;
remove it before committing unless all lock sources are portable.

Commit `.agents/skills/<skill-name>/` when helper skills change. The marketplace
build preserves `.agents/skills/` and regenerates only `.agents/plugins/`.

## Final Check

Run the full check before opening a PR:

```bash
npm run check
```

This command validates source skills, rebuilds generated files, validates
marketplace artifacts against the canonical `skills/` folders, and fails if
committed generated marketplace artifacts are stale.

## Prose Linting

Vale runs in pull requests as an advisory prose linter for source documentation:
root Markdown files, `docs/`, and canonical `skills/` packages. It intentionally
does not scan generated marketplace artifacts under `.claude-plugin/`,
`.agents/plugins/`, or `plugins/`.

To run it locally, install Vale `3.15.1` to match CI and use:

```bash
npm run lint:prose
```

If Vale flags valid project terminology, add a focused regular expression to
`.github/styles/config/vocabularies/LVTD/accept.txt`. Use
`.github/styles/config/vocabularies/LVTD/reject.txt` only for terms that should
be blocked across skill prose.

## PR Checklist

- Source skill is added or updated under `skills/<skill-name>/`.
- Marketplace grouping rules are updated when the skill should ship in a
  generated plugin.
- Generated marketplace artifacts are regenerated with `npm run build`.
- Source material is attributed with links where possible.
- `npm run check` passes.
- Any workflow changes are reflected in this guide and `AGENTS.md`.
