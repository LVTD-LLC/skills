# Draft Developer Doc Workflow

Draft a developer documentation page from audience, goal, and source material.

## When To Use

- Creating a README, getting-started guide, tutorial, how-to, concept, troubleshooting page, migration guide, or release doc.
- Rewriting a page whose structure is unclear.
- Turning notes or source material into a doc draft.

## Prerequisites

- Audience and reader goal.
- Content type or documentation plan.
- Source material: code, API schema, design note, issue, release note, or existing doc.

**Reference**: from this workflow file, open `../references/core/knowledge.md`.

## Workflow Steps

### Step 1: Set The Draft Frame

**Goal**: Prevent the doc from drifting.

- [ ] Name the primary reader.
- [ ] Write the one primary goal.
- [ ] Choose the content type.
- [ ] List prerequisites, assumptions, and source material.

### Step 2: Create The Outline

**Goal**: Make structure visible before prose.

- [ ] Draft a title that reflects the reader goal.
- [ ] List sections in reader order.
- [ ] Add prerequisites before first action.
- [ ] Add verification, troubleshooting, and next steps when relevant.
- [ ] Remove sections that do not support the goal.

### Step 3: Draft The Body

**Goal**: Produce usable content.

- [ ] Write a short opening with outcome and context.
- [ ] Use headings that let readers skim.
- [ ] Put ordered actions in numbered steps.
- [ ] Use bullets or tables for unordered groups.
- [ ] Keep callouts rare and important.
- [ ] Mark TODOs instead of inventing uncertain details.

### Step 4: Check Reader Flow

**Goal**: Catch the most common draft failures.

- [ ] The reader knows whether the doc is for them.
- [ ] The first command or action has all prerequisites.
- [ ] Each step has one main action.
- [ ] The reader can verify success.
- [ ] Links route away only when leaving the page is useful.

### Step 5: Return The Draft

**Goal**: Make review easy.

- [ ] Provide the draft in the requested format.
- [ ] List assumptions and source gaps.
- [ ] Name reviewers or facts that need technical validation.

## Exit Criteria

- [ ] The title, opening, and outline align to one reader goal.
- [ ] The draft is skimmable and procedurally complete for its scope.
- [ ] Unverified details are marked, not guessed.
