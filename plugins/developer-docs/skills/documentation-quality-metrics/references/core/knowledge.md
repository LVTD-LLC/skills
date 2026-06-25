# Documentation Quality Metrics Knowledge

Documentation quality is whether the doc fulfills its purpose for its readers. Measurement should start with the decision the team needs to make.

Source basis: *Docs for Developers*, Chapter 9, "Measuring documentation quality."

## Functional Quality

| Dimension | Meaning |
|-----------|---------|
| Accessible | More users can understand and navigate the content |
| Purposeful | The doc has a clear reader goal and supports it |
| Findable | Users can locate the doc and related next steps |
| Accurate | Technical details, examples, and links are correct and current |
| Complete | The doc includes prerequisites, task details, expected outcomes, and next steps for its scope |

## Structural Quality

| Dimension | Meaning |
|-----------|---------|
| Clear | The reader can follow concepts, steps, and outcomes |
| Concise | The doc avoids unnecessary material |
| Consistent | Terms, patterns, formats, and voice are stable |

## Metric Sources

- Web analytics: visitors, views, paths, search terms, exits, time on page.
- Docs behavior: searches with no result, link clicks, feedback, page ratings.
- Support data: ticket volume, categories, repeated questions.
- Technical checks: link checks, sample tests, API schema drift, lint results.
- User outcomes: Time to Hello World, onboarding completion, task success.
- Qualitative inputs: interviews, usability tests, friction logs, comments.

## Common Misconceptions

- **Myth**: A single metric can prove doc quality.
  **Reality**: Use clusters of metrics plus qualitative evidence.
- **Myth**: High traffic means a doc is good.
  **Reality**: It may indicate importance, confusion, or discoverability.
- **Myth**: Structural polish fixes functional failure.
  **Reality**: A concise inaccurate doc is still poor documentation.

## Rules And Checks

Use these rules when auditing docs or designing measurement plans.

## Core Rules

1. **Start with the decision** - Ask what the team will change based on the measurement.
2. **Tie metrics to goals** - Map organization goals, user goals, and doc goals separately.
3. **Audit functional quality first** - Accessibility, purpose, findability, accuracy, and completeness outrank prose polish.
4. **Use metric clusters** - Pair traffic with search, feedback, support, task success, or technical checks.
5. **Create a baseline** - Current values matter more than isolated numbers.
6. **Add context** - Segment by audience, release, doc type, source, or product area.
7. **Mix qualitative and quantitative data** - Numbers show where to look; user evidence helps explain why.
8. **Beware vanity metrics** - Pageviews, time on page, and ratings can mislead without intent.
9. **Measure maintainability** - Link health, sample test status, freshness, and owner review are quality signals.

## Quick Metric Map

| Question | Possible Signals |
|----------|------------------|
| Can users find the doc? | Internal search, navigation paths, search terms, backlinks |
| Does the doc help users start? | Time to Hello World, setup completion, support tickets |
| Is the doc accurate? | Sample tests, link checks, API drift, reviewer status |
| Is the doc understandable? | Feedback themes, usability tests, readability checks |
| Does docs work reduce support load? | Ticket trends, deflection patterns, repeated issue volume |

## Red Flags

- A dashboard reports metrics with no decision owner.
- Pageviews are treated as success for troubleshooting docs.
- The team optimizes readability score while examples fail.
- Metrics ignore docs that are low traffic but high risk.
- No baseline exists before a docs change.


## Examples And Patterns

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
