# Docs Release Maintenance Rules

Use these rules when publishing, maintaining, deprecating, or deleting developer docs.

## Core Rules

1. **Plan docs with the code change** - Include docs in release planning, not as post-release cleanup.
2. **Analyze user impact** - Identify who is affected, what changes, and what action they must take.
3. **Require appropriate review** - Use peer, technical, security, legal, or product review based on risk.
4. **Test before publishing** - Check links, examples, generated refs, screenshots, and release-specific facts.
5. **Publish where users will look** - Delivery location should match user behavior and product entry points.
6. **Announce material changes** - Users need to know when docs explain new, changed, or breaking behavior.
7. **Assign ownership** - Critical docs need owners, metadata, or CODEOWNERS-style review.
8. **Automate known toil** - Use freshness reminders, link checks, linters, and generators where the process is clear.
9. **Deprecate before deleting when users need time** - Provide warning, alternatives, migration guide, and timeline.
10. **Redirect removed content** - Preserve user paths and search behavior where possible.

## Release Checklist

| Area | Check |
|------|-------|
| Scope | Affected docs and user actions identified |
| Review | Technical and editorial reviewers assigned |
| Testing | Links, samples, screenshots, and generated refs checked |
| Approval | Final approver named |
| Delivery | Publish location and timing confirmed |
| Announcement | Release notes or comms include impact and action |
| Maintenance | Owner and update trigger recorded |

## Red Flags

- Docs are blocked on facts no one owns.
- Release notes say what changed but not who is affected.
- A stale page is deleted without redirect or alternative.
- Generated API docs are trusted without usability review.
- Automation is proposed before handoffs and failure modes are understood.
