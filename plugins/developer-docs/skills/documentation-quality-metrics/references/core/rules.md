# Documentation Quality Metrics Rules

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
