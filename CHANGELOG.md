# Changelog

## Unreleased

- Created the initial LVTD skills catalog.
- Added `calibredb` for managing and querying Calibre libraries with the `calibredb` CLI.
- Added `book-toc-lab` for designing and validating useful nonfiction book tables of contents before drafting.
- Added `alpinejs-django`, `django-htmx`, and `django-q2`.
- Added validation, registry generation, install instructions, CI, and publish workflow scaffolding.
- Added `cookiecutter` for Cookiecutter template development workflows.
- Added `fastmcp-django` for integrating FastMCP MCP servers into existing Django apps.
- Added generated Claude Code and Codex marketplace artifacts at the repository root.
- Expanded registry output with per-skill version, license, category, tags, host plugin names, files, and content hashes.
- Added CI validation for generated marketplace artifacts.
- Removed LVTD branding from generated marketplace plugin display titles and default prompt text.
- Switched generated marketplace plugins to copied skill folders so Codex plugin caches include real `SKILL.md` files.
- Added `make-product-viral`, inspired by Marc Lou's viral product principles, for auditing products, landing pages, pricing, and social previews.
- Grouped generated marketplace plugins into `rust`, `django`, `nonfiction-book-writing`, and `cookiecutter` with `Coding` and `Writing` marketplace categories.
- Added automated main-branch releases that bump patch versions when needed, tag releases, package artifacts, and publish GitHub releases.
- Added `lvtd-skills-router` and the generated `router` marketplace plugin for choosing skills across the catalog.
- Added `CONTEXT.md` and workflow-oriented README guidance for common skill-selection paths.
- Replaced the exhaustive README skill table with a skill-discovery section that points to `lvtd-skills-router`, `skills/`, and the generated registry.
