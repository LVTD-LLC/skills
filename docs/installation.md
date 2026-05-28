# Installation

LVTD skills are plain folders that contain a `SKILL.md` file. Most agents can use them by copying a skill folder into the agent's configured skills directory.

## Install With The Helper

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- <skill-name> <target-skill-directory>
```

Example:

```bash
npm run install-skill -- django-htmx ~/.codex/skills
```

The command copies `skills/django-htmx` into `~/.codex/skills/django-htmx`.

## Codex

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- django-htmx ~/.codex/skills
```

Restart Codex or start a new session if your runtime only discovers skills at launch.

## Claude Code

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- django-htmx ~/.claude/skills
```

If your Claude Code setup uses project-local skills, install into that project's skill directory instead.

## OpenClaw

Workspace-level skills usually live under:

```bash
~/.openclaw/workspace/skills
```

Install one:

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- django-htmx ~/.openclaw/workspace/skills
```

Agent-local OpenClaw installs can use the same command with the relevant agent skill directory.

## Hermes And Other Agents

For Hermes or another agent runtime, install into the directory that runtime scans for skills:

```bash
git clone https://github.com/LVTD-LLC/skills.git
cd skills
npm run install-skill -- django-htmx /path/to/agent/skills
```

The required contract is intentionally small:

- The target directory must contain one folder per skill.
- Each skill folder must contain a `SKILL.md`.
- The `SKILL.md` frontmatter should include `name` and `description`.

## Manual Install

```bash
mkdir -p ~/.codex/skills
cp -R skills/django-htmx ~/.codex/skills/django-htmx
```

## Bulk Install

```bash
for skill in skills/*; do
  npm run install-skill -- "$(basename "$skill")" ~/.codex/skills
done
```

