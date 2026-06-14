# Technical SEO Triage Knowledge

Core concepts for diagnosing technical SEO issues.

## Source Anchors

| Source | Lines |
|--------|-------|
| Discovery, crawling, indexing, ranking | `/tmp/codex-product-led-seo/product-led-seo.md:820` |
| Algorithm updates and traffic drops | `/tmp/codex-product-led-seo/product-led-seo.md:1013` |
| Internal linking and link graph | `/tmp/codex-product-led-seo/product-led-seo.md:5158` |
| Crawl budget | `/tmp/codex-product-led-seo/product-led-seo.md:5400` |
| Google Search Console | `/tmp/codex-product-led-seo/product-led-seo.md:5509` |
| Duplicate content | `/tmp/codex-product-led-seo/product-led-seo.md:5680` |
| Site updates and migrations | `/tmp/codex-product-led-seo/product-led-seo.md:5751` |

## Key Concepts

### Search Stages

**Discovery**: Google learns a URL exists from links, sitemaps, submissions, analytics, browser signals, or other sources.

**Crawling**: Google decides whether to spend resources fetching the URL.

**Indexing**: Google decides whether and how to store the page, including duplicate and canonical decisions.

**Ranking**: Google matches indexed pages to queries based on intent, relevance, quality, usability, and context.

Do not diagnose all SEO issues as ranking issues. First identify the stage where the failure happens.

### Google Search Console As Source Of Truth

GSC is the primary source for how Google sees visibility, queries, pages, indexing, canonical choices, and search performance.

Third-party tools are useful, but they estimate. Use them to explore, not to override GSC.

### Internal Link Graph

Internal links distribute authority and help crawlers discover important pages. Large sites often create orphaned or near-orphaned pages when related-content modules only reinforce already popular pages.

### Crawl Budget

Crawl budget is best treated as scarce crawler attention. Low-value URLs, duplicate pages, blocked paths, and weak internal links can waste attention before crawlers reach valuable pages.

### Duplicate Content

Duplicate content is usually a canonicalization and quality-selection issue, not automatically a penalty. The risk rises when duplication exists to manipulate search or makes the site look low quality.

### Migrations And Redirects

URL changes create risk because search engines must accept the new URL as equivalent to the old one. Permanent redirects, complete URL mapping, pre-launch crawls, and long-term redirect maintenance are core safeguards.

## Terminology

| Term | Definition |
|------|------------|
| Canonical | The primary URL Google or the site selects for duplicate/similar content |
| Orphan page | A page with few or no internal links pointing to it |
| Crawl demand | Google's reason to revisit and refresh URLs |
| 301 redirect | Permanent redirect used for moved URLs |
| 302 redirect | Temporary redirect; usually not appropriate for permanent migrations |
| Brand traffic | Queries that include the brand or depend on brand awareness |
| Non-brand traffic | Queries from users who may not know the brand |
