# LVTD Skills Context

This repository is a catalog of reusable agent skills. The source tree is kept
simple so skills can be installed directly, while generated marketplace
artifacts package related skills for Codex, Claude Code, and compatible clients.

## Language

**Source skill**:
The canonical skill directory under `skills/<skill-name>/`. Every source skill
has a `SKILL.md` file and may include local `references/`, `workflows/`,
`scripts/`, `assets/`, or host-specific helper files.
_Avoid_: editing generated plugin copies.

**Generated artifact**:
Any file produced by `npm run build`, including `dist/registry.json`,
`.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, and
`plugins/<plugin-name>/`.
_Avoid_: hand-editing generated artifacts.

**Marketplace plugin**:
A generated package that groups related source skills for plugin-based clients.
Plugin grouping is defined in `scripts/marketplace-utils.mjs`.
_Avoid_: treating marketplace plugins as the canonical source.

**Direct install**:
Installing a source skill by name from this repository, without installing a
generated marketplace plugin.
_Avoid_: assuming every source skill must belong to a marketplace plugin.

**Router skill**:
A skill that helps the user or agent choose the right source skill for a
problem. Router skills remain model-invokable; they reduce selection friction
without creating a manual-only command layer.
_Avoid_: using router skills as a substitute for the selected domain skill once
the right skill is clear.

**Skill workflow**:
The repeatable process inside a `SKILL.md`. A workflow may inspect, research,
plan, implement, review, or verify depending on the user's request and the
skill's domain.
_Avoid_: forcing every skill into a global planning/execution taxonomy.

## Relationships

- A **Source skill** is the source of truth.
- A **Marketplace plugin** contains links to one or more **Source skills**.
- A **Generated artifact** is rebuilt from **Source skills** and marketplace
  grouping rules.
- A **Router skill** recommends or invokes other **Source skills**.
- A **Direct install** can expose a **Source skill** even when it is not included
  in a **Marketplace plugin**.

## Operating Rules

- Add or update skills under `skills/<skill-name>/`.
- Run `npm run check` before finishing skill or marketplace changes.
- Commit source skill changes together with regenerated marketplace artifacts.
- Keep router guidance focused on choosing skills; keep domain behavior in the
  domain skill that owns it.
