# LVTD Skills

Reusable agent skills for LVTD projects, Django SaaS workflows, and agent-first software development.

This repository is intentionally simple: every skill lives in `skills/<skill-name>/SKILL.md`, with small validation and publishing scripts around that catalog. That shape works well for agents that read skill folders directly, and it is easy for external indexes like skills.sh to consume.

## Skills

| Skill | Use when |
| --- | --- |
| [`alpinejs-django`](skills/alpinejs-django/SKILL.md) | Adding, changing, or debugging Alpine.js behavior in Django templates, especially when HTMX partial swaps are also present. |
| [`cookiecutter`](skills/cookiecutter/SKILL.md) | Adding, changing, testing, or debugging Cookiecutter templates, including Jinja rendering, hooks, option cleanup, and generated-project validation. |
| [`django-htmx`](skills/django-htmx/SKILL.md) | Building and reviewing HTMX interactions in Django server-rendered apps, including partial responses, headers, swaps, triggers, forms, and tests. |
| [`django-q2`](skills/django-q2/SKILL.md) | Adding, changing, testing, or debugging Django Q2 background jobs, schedules, workers, and broker configuration. |
| [`fastmcp-django`](skills/fastmcp-django/SKILL.md) | Adding, changing, deploying, testing, or debugging FastMCP MCP servers in existing Django apps, including ASGI mounting, ORM access, auth, and Streamable HTTP deployment. |

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

Refresh generated marketplace artifacts during development:

```bash
npm run build
```

Generated plugin names:

- `lvtd-alpinejs-django`
- `lvtd-cookiecutter`
- `lvtd-django-htmx`
- `lvtd-django-q2`
- `lvtd-fastmcp-django`

## Marketplace Strategy

See [`docs/marketplace-strategy.md`](docs/marketplace-strategy.md) for the
research-backed plan to publish this catalog across Codex, Claude Code,
OpenClaw, and other Agent Skills-compatible clients.

## Development

Validate all skills:

```bash
npm test
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

## Publishing

CI validates every push and pull request. The publish workflow validates the catalog, builds `dist/registry.json`, and uploads a `skills-catalog` artifact. When run on a `v*` tag, it also creates a GitHub release.

```bash
git tag v0.1.0
git push origin v0.1.0
```
