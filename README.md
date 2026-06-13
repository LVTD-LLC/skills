<img src="assets/app-icon.png" alt="LVTD fire heart logo" width="96" height="96">

# LVTD Skills

Reusable agent skills for LVTD projects, Django SaaS workflows, and agent-first software development.

This repository is intentionally simple: every skill lives in `skills/<skill-name>/SKILL.md`, with small validation and publishing scripts around that catalog. That shape works well for agents that read skill folders directly, and it is easy for external indexes like skills.sh to consume.

## Skills

| Skill | Use when |
| --- | --- |
| [`alpinejs-django`](skills/alpinejs-django/SKILL.md) | Adding, changing, or debugging Alpine.js behavior in Django templates, especially when HTMX partial swaps are also present. |
| [`calibredb`](skills/calibredb/SKILL.md) | Managing and querying Calibre libraries with the calibredb CLI, including metadata, formats, exports, checks, and full-text search. |
| [`cookiecutter`](skills/cookiecutter/SKILL.md) | Adding, changing, testing, or debugging Cookiecutter templates, including Jinja rendering, hooks, option cleanup, and generated-project validation. |
| [`django-htmx`](skills/django-htmx/SKILL.md) | Building and reviewing HTMX interactions in Django server-rendered apps, including partial responses, headers, swaps, triggers, forms, and tests. |
| [`django-q2`](skills/django-q2/SKILL.md) | Adding, changing, testing, or debugging Django Q2 background jobs, schedules, workers, and broker configuration. |
| [`fastmcp-django`](skills/fastmcp-django/SKILL.md) | Adding, changing, deploying, testing, or debugging FastMCP MCP servers in existing Django apps, including ASGI mounting, ORM access, auth, and Streamable HTTP deployment. |
| [`make-product-viral`](skills/make-product-viral/SKILL.md) | Making a product, landing page, pricing page, launch page, free tool, or social preview easier to understand, buy, remember, and share. |

## Repository Layout

```text
skills/
  <skill-name>/
    SKILL.md
docs/
  installation.md
scripts/
  build-marketplaces.mjs
  build-registry.mjs
  skill-utils.mjs
  validate-marketplaces.mjs
  validate-skills.mjs
tests/
  validate-skills.mjs
```

## Install A Skill Directly

Use the `skills` CLI to install from this repository:

```bash
npx skills add LVTD-LLC/skills --skill django-htmx
```

Common targets:

```bash
# Codex global skills
npx skills add LVTD-LLC/skills --skill django-htmx -g -a codex

# Claude Code global skills
npx skills add LVTD-LLC/skills --skill django-htmx -g -a claude-code

# OpenClaw global skills
npx skills add LVTD-LLC/skills --skill django-htmx -g -a openclaw

# Install from a local checkout
npx skills add . --skill django-htmx
```

More details are in [`docs/installation.md`](docs/installation.md).

## Marketplace Install

Add the marketplace in Claude Code:

```text
/plugin marketplace add LVTD-LLC/skills
/plugin install lvtd-django-htmx@lvtd-skills
/reload-plugins
```

Claude Code exposes the skill as `/lvtd-django-htmx:django-htmx`.

Add the marketplace in Codex:

```bash
codex plugin marketplace add LVTD-LLC/skills
codex plugin add lvtd-django-htmx@lvtd-skills
```

Codex exposes the skill as `$lvtd-django-htmx:django-htmx`.

This repository ships the marketplace files directly:

```text
.claude-plugin/marketplace.json
.agents/plugins/marketplace.json
plugins/lvtd-<skill-name>/
```

The plugin skill folders are symlinks back to `skills/<skill-name>/`, so each
skill has one canonical source file tree while Claude Code, Codex, OpenClaw,
and the `skills` CLI can use host-specific adapters.

Refresh generated marketplace artifacts during development:

```bash
npm run build
```

Generated plugin IDs:

- `lvtd-alpinejs-django`
- `lvtd-calibredb`
- `lvtd-cookiecutter`
- `lvtd-django-htmx`
- `lvtd-django-q2`
- `lvtd-fastmcp-django`
- `lvtd-make-product-viral`

The `lvtd-` plugin ID prefix is kept for install namespace safety. Displayed
skill names and prompt text omit that prefix.

## Marketplace Strategy

See [`docs/marketplace-strategy.md`](docs/marketplace-strategy.md) for the
research-backed plan to publish this catalog across Codex, Claude Code,
OpenClaw, and other Agent Skills-compatible clients.

## Development

New skills should follow [`docs/adding-skills.md`](docs/adding-skills.md).

Validate source skills only:

```bash
npm run validate
```

Build the machine-readable registry and refresh committed marketplace artifacts:

```bash
npm run build
```

The registry is written to `dist/registry.json`. Marketplace artifacts are
written to `.claude-plugin/`, `.agents/plugins/`, and `plugins/`.

Validate generated marketplace artifacts:

```bash
npm run validate:marketplaces
```

Run the full local/CI check before opening a PR:

```bash
npm run check
```

## Publishing

CI validates every push and pull request. The publish workflow validates the catalog, builds `dist/registry.json`, and uploads a `skills-catalog` artifact. When run on a `v*` tag, it also creates a GitHub release.

```bash
git tag v0.1.0
git push origin v0.1.0
```
