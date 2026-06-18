<img src="assets/app-icon.png" alt="LVTD fire heart logo" width="96" height="96">

# LVTD Skills

Reusable agent skills for LVTD projects, Django SaaS workflows, and agent-first software development.

This repository is intentionally simple: every skill lives in `skills/<skill-name>/SKILL.md`, with small validation and publishing scripts around that catalog. That shape works well for agents that read skill folders directly, and it is easy for external indexes like skills.sh to consume.

## Common Workflows

Start with [`lvtd-skills-router`](skills/lvtd-skills-router/SKILL.md) when you
are not sure which skill fits. It routes by domain and desired outcome, then
points the agent at the smallest useful set of skills.

- **Django SaaS work**: use `django-htmx` for server-rendered partial updates,
  `alpinejs-django` for local template behavior, `django-q2` for background
  jobs, `fastmcp-django` for MCP servers inside Django apps, and the
  `django-test-*` skills when test suites need profiling, faster data setup,
  parallelism, or CI optimization.
- **Rust service work**: use `rust-api-test-harness` for black-box HTTP
  integration tests, then reach for the Rust service skills when the work
  involves SQLx/Postgres, domain boundaries, observability, security,
  idempotent workflows, or deployment readiness.
- **SEO and organic growth**: use `seo-opportunity-research` to find demand,
  `seo-persona-intent-mapping` to clarify audience and intent,
  `product-led-seo-strategy` to shape the strategy, `seo-roadmap-prioritization`
  to sequence work, and `technical-seo-triage` for indexing or traffic issues.
- **Useful nonfiction books**: use `book-toc-lab` to shape the promise, scope,
  reader outcome, and takeaway-first table of contents; use the other
  nonfiction skills for reader experience edits, beta feedback, seed marketing,
  sales optimization, and self-publishing production.
- **Customer discovery**: use `customer-discovery-conversations` to plan
  better customer conversations, then use the related skills for segment
  slicing, conversation access, commitment validation, and notes synthesis.
- **Startup traction**: use the traction skills to choose channels, research
  comparable growth paths, design cheap tests, review results, and plan
  channel-specific experiments.
- **Product and launch polish**: use `make-product-viral` to improve clarity,
  memorability, buying intent, and shareability on product-facing surfaces.
- **Catalog and template operations**: use `calibredb` for Calibre library
  operations and `cookiecutter` for template authoring, hooks, and generated
  project validation.

## Skill Discovery

Use [`lvtd-skills-router`](skills/lvtd-skills-router/SKILL.md) when you are not
sure which skill fits. The complete catalog lives in `skills/` and the generated
registry; this README intentionally groups workflows instead of mirroring every
skill file.

Skill areas:

- **Django**: server-rendered UI, HTMX, Alpine.js, background jobs, MCP servers,
  and Django test-suite optimization.
- **Rust**: HTTP API test harnesses, SQLx/Postgres persistence, domain
  boundaries, observability, security, idempotent workflows, and deployment.
- **SEO**: opportunity research, persona-intent mapping, product-led strategy,
  roadmap prioritization, and technical SEO triage.
- **Nonfiction writing**: table-of-contents design, reader experience editing,
  beta feedback, seed marketing, sales optimization, and production.
- **Customer discovery**: customer interview planning, segment slicing,
  conversation access, commitment validation, and learning synthesis.
- **Traction**: Bullseye channel selection, channel research, cheap tests,
  experiment reviews, and channel-specific playbooks.
- **Utilities**: Cookiecutter template development, Calibre library operations,
  and product/launch polish.

## Repository Layout

```text
CONTEXT.md
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
/plugin install router@lvtd-skills
/plugin install django@lvtd-skills
/reload-plugins
```

Claude Code exposes the router as `/router:lvtd-skills-router`. Domain plugins
expose bundled skills such as `/django:django-htmx`, `/django:django-q2`, and
the other skills in each plugin.

Add the marketplace in Codex:

```bash
codex plugin marketplace add LVTD-LLC/skills
codex plugin add router@lvtd-skills
codex plugin add django@lvtd-skills
```

Codex exposes the router as `$router:lvtd-skills-router`. Domain plugins expose
bundled skills such as `$django:django-htmx`, `$django:django-q2`, and the other
skills in each plugin.

To pick up a marketplace update for an already-installed Codex plugin, refresh
the marketplace snapshot and reinstall the plugin:

```bash
codex plugin marketplace upgrade lvtd-skills
codex plugin remove django@lvtd-skills
codex plugin add django@lvtd-skills
```

This repository ships the marketplace files directly:

```text
.claude-plugin/marketplace.json
.agents/plugins/marketplace.json
plugins/<plugin-name>/
```

The plugin skill folders are generated copies of `skills/<skill-name>/`, so
Git-backed marketplace installs have real `SKILL.md` files while the canonical
source remains under `skills/`. Do not edit generated plugin copies directly.

Refresh generated marketplace artifacts during development:

```bash
npm run build
```

Generated marketplace plugin IDs:

- `cookiecutter`
- `customer-discovery`
- `django`
- `nonfiction-book-writing`
- `router`
- `rust`
- `seo`
- `traction`

Marketplace plugins group related skills. Direct installs through the `skills`
CLI still use the canonical skill directory names.

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

CI validates every push and pull request. Publishing is tag-driven:

1. Update the catalog version in `package.json`.
2. Run `npm run check` and commit the generated marketplace artifacts.
3. Create and push a matching `v*` tag, for example `v0.1.3`.

The catalog version in `package.json` is also the generated marketplace plugin
version, so Codex installs use a new plugin cache path when the version changes.
The `Publish` workflow packages the registry and marketplace tarballs, then
publishes them on the GitHub release for pushed `v*` tags.
