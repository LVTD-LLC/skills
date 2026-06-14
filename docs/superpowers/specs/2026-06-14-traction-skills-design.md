# Traction Skills Design

## Goal

Create a suite of focused agent skills from Gabriel Weinberg and Justin Mares'
Traction framework. The skills should help agents do concrete growth work:
choose channels, design traction tests, set traction goals, and apply
channel-specific playbooks.

## Source

- Book: Traction: How Any Startup Can Achieve Explosive Customer Growth
- Local source used for analysis: Calibre ID 2 EPUB, converted to
  `tmp/book-analysis/traction/traction.txt`
- Extraction approach: paraphrase operational ideas with chapter and line-range
  traceability. Do not copy long passages into the skills.

## Skill Shape

Use a suite of focused skills instead of one book-wide skill:

- `traction-bullseye`
- `traction-test-planner`
- `traction-critical-path`
- `traction-channel-research`
- `traction-pr-playbook`
- `traction-paid-acquisition`
- `traction-seo-content`
- `traction-email-marketing`
- `traction-viral-engineering`
- `traction-partnership-sales`
- `traction-events-community`
- `traction-review`

## Design Rules

- Each skill should trigger independently from a practical task prompt.
- Each skill should produce useful work products, not book summaries.
- Keep chapter provenance visible in the skill body or a reference file.
- Prefer checklists, worksheet fields, and decision rules over narrative.
- Run repository validation and regenerate generated marketplace artifacts.

## Initial Scope

Create all 12 skill shells in this pass. Fully flesh out the three core workflow
skills first:

1. `traction-bullseye`
2. `traction-test-planner`
3. `traction-critical-path`

The channel-specific skills should be usable in this pass, but can be deepened
later with more chapter-specific examples and evals.
