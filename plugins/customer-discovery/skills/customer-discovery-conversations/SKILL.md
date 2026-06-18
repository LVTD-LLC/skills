---
name: customer-discovery-conversations
description: Plan and audit customer discovery conversations that produce concrete evidence instead of compliments, opinions, hypotheticals, or feature-request noise. Use when planning customer interviews, rewriting interview scripts, validating startup ideas before building, avoiding biased questions, or applying Mom Test-style customer learning.
license: MIT
compatibility: Codex, Claude Code, and other Agent Skills-compatible clients.
metadata:
  version: "0.1.2"
  displayName: Customer Discovery Conversations
  category: Marketing
  tags: customer-discovery,customer-interviews,startups,validation,research
---

# Customer Discovery Conversations

Use this skill to turn customer conversations into decision-quality evidence.
The goal is not approval for an idea. The goal is to learn concrete facts about
customers' lives, current behavior, constraints, costs, workarounds, and risks.

## Source Traceability

Primary source: The Mom Test by Rob Fitzpatrick. Guidance is paraphrased for
this MIT repo.

- Chapter 1 defines the core question discipline. Authoring notes: converted
  lines 236-800.
- Chapter 2 classifies bad data and recovery moves. Authoring notes: converted
  lines 803-1590.
- Chapter 3 covers important and scary questions. Authoring notes: converted
  lines 1593-2173.
- Chapter 4 covers casual conversation posture. Authoring notes: converted
  lines 2176-2362.
- Chapter 8 covers prep, review, and notes. Authoring notes: converted lines
  3613-4108.

## Workflow Routing

| Need | Use |
|------|-----|
| Rewrite an interview script | `workflows/rewrite-interview-questions.md` |
| Run a batch of conversations | `workflows/run-conversation-batch.md` |
| Recover from compliments, hypotheticals, or ideas | `workflows/recover-bad-data.md` |
| Segment is too broad | `customer-segment-slicing` |
| Product or sales meeting needs a real next step | `customer-commitment-validation` |
| Raw notes need synthesis | `customer-learning-notes` |

## Conversation Workflow

1. State the decision the conversations should improve.
2. Name the riskiest assumptions, including at least one uncomfortable question.
3. Choose the narrow customer or stakeholder type. If the segment is fuzzy, use
   `customer-segment-slicing` first.
4. Prepare up to three learning goals for this type of person.
5. Rewrite questions toward current behavior and specific past examples.
6. Keep the conversation about the customer until there is enough evidence to
   discuss a solution.
7. During the conversation, anchor vague claims to recent examples and dig into
   current costs, workarounds, constraints, and goals.
8. Capture notes, signals, and follow-up tasks for review.

## Good Evidence

Prefer evidence such as:

- Recent examples of the problem happening.
- Current attempts to solve or avoid the problem.
- Time, money, reputation, or operational cost already spent.
- Existing tools, people, workflows, budgets, approval paths, and constraints.
- Specific names, systems, competitors, decision makers, and next steps.
- Strong emotion backed by a concrete story.

Treat these as weak evidence:

- Compliments about the idea.
- Opinions about whether the business will work.
- Promises about future behavior.
- Generic statements about what someone usually does.
- Feature requests without the motivation behind them.

## Output Format

```markdown
# Customer Discovery Plan

## Decision
[What this evidence should help decide.]

## Segment
[Who to talk to and why.]

## Risk Questions
1. [Scary or high-impact question.]
2. [Scary or high-impact question.]
3. [Scary or high-impact question.]

## Conversation Guide
| Goal | Ask About | Avoid |
|------|-----------|-------|

## Evidence To Capture
- Current behavior:
- Past examples:
- Workarounds:
- Costs or budget:
- Constraints:
- Strong emotion:
- Follow-up:

## Review Criteria
- What changed in our beliefs?
- What is still unknown?
- What are the next 3 questions?
```

## Quality Bar

- Do not help users collect approval or compliments.
- Do not ask customers to design the product for the team.
- Do not treat "I would buy this" as validation without commitment.
- Do not run conversations without a decision, segment, and learning goals.
- Prefer fewer high-value conversations over many generic interviews.
