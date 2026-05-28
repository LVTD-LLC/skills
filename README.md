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

## Repository Layout

```text
skills/
  <skill-name>/
    SKILL.md
docs/
  installation.md
scripts/
  build-registry.mjs
  install-skill.mjs
  validate-skills.mjs
tests/
  validate-skills.mjs
```

## Install A Skill

Use the helper script to copy one skill into an agent's skill directory:

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- django-htmx ~/.codex/skills
```

Common targets:

```bash
# Codex
npm run install-skill -- django-htmx ~/.codex/skills

# Claude Code
npm run install-skill -- django-htmx ~/.claude/skills

# OpenClaw workspace skills
npm run install-skill -- django-htmx ~/.openclaw/workspace/skills

# Hermes or another agent with a skill folder
npm run install-skill -- django-htmx /path/to/agent/skills
```

More details are in [`docs/installation.md`](docs/installation.md).

## Development

Validate all skills:

```bash
npm test
```

Build the machine-readable registry:

```bash
npm run build
```

The registry is written to `dist/registry.json`.

## Publishing

CI validates every push and pull request. The publish workflow validates the catalog, builds `dist/registry.json`, and uploads a `skills-catalog` artifact. When run on a `v*` tag, it also creates a GitHub release.

```bash
git tag v0.1.0
git push origin v0.1.0
```

