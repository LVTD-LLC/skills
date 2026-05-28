# Installation

LVTD skills are plain folders that contain a `SKILL.md` file. Use the `skills` CLI to install them from GitHub, a direct skill URL, any git URL, or a local checkout.

## Install With The Skills CLI

```bash
npx skills add LVTD-LLC/skills --skill <skill-name>
```

Example:

```bash
npx skills add LVTD-LLC/skills --skill django-htmx
```

The command installs `django-htmx` from the `LVTD-LLC/skills` repository. The CLI will prompt for the target agent and scope if they are not provided.

## Source Formats

```bash
# GitHub shorthand
npx skills add LVTD-LLC/skills --skill django-htmx

# Full GitHub URL
npx skills add https://github.com/LVTD-LLC/skills --skill django-htmx

# Direct path to a skill in the repository
npx skills add https://github.com/LVTD-LLC/skills/tree/main/skills/django-htmx

# Any git URL
npx skills add git@github.com:LVTD-LLC/skills.git --skill django-htmx

# Local checkout
npx skills add . --skill django-htmx
```

## Codex

```bash
npx skills add LVTD-LLC/skills --skill django-htmx -g -a codex
```

Restart Codex or start a new session if your runtime only discovers skills at launch.

## Claude Code

```bash
npx skills add LVTD-LLC/skills --skill django-htmx -g -a claude-code
```

If your Claude Code setup uses project-local skills, install into that project's skill directory instead.

## OpenClaw

```bash
npx skills add LVTD-LLC/skills --skill django-htmx -g -a openclaw
```

Use project scope instead of `-g` when you want the skill committed with a project.

## Hermes And Other Agents

For Hermes or another agent runtime, let the CLI prompt for the agent target or pass the relevant `--agent` value:

```bash
npx skills add LVTD-LLC/skills --skill django-htmx
```

The required contract is intentionally small:

- The target directory must contain one folder per skill.
- Each skill folder must contain a `SKILL.md`.
- The `SKILL.md` frontmatter should include `name` and `description`.

## Local Development

```bash
# Install one skill from the current checkout
npx skills add . --skill django-htmx
```

## Bulk Install

```bash
npx skills add LVTD-LLC/skills --skill '*'
```
