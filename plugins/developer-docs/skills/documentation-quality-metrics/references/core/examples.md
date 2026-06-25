# Documentation Quality Metrics Examples

Use these examples as metric-plan patterns.

## Metric Cluster

Question: Are new users succeeding with the quickstart?

Useful signals:

- Time to Hello World.
- Completion rate for setup steps.
- Search terms from the quickstart page.
- Support tickets tagged setup or auth.
- Page feedback about missing prerequisites.
- Test status for commands and code samples.

Avoid relying only on:

- Pageviews.
- Average time on page.
- A single thumbs-up/thumbs-down score.

## Quality Finding Pattern

```text
Finding: The quickstart is purposeful but incomplete.
Evidence: It states a clear outcome, but omits required dashboard access and expected output after the first API call.
Impact: New users can follow the steps but cannot verify success.
Fix: Add prerequisites and expected response body; test the sample before release.
Metric to watch: Setup-related support tickets and quickstart feedback for "missing prerequisite."
```

## Goal Mapping

| Goal Type | Example Goal | Possible Measurement |
|-----------|--------------|----------------------|
| Organization | Reduce onboarding support load | Setup-ticket trend |
| User | Create first test charge | Time to Hello World |
| Doc | Make auth prerequisites clear | Feedback themes and checklist audit |
