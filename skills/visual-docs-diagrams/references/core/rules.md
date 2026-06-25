# Visual Docs Rules

Use these rules when designing or reviewing visuals in developer documentation.

## Core Rules

1. **Define the visual's job** - Use a visual only when it helps comprehension, not decoration.
2. **Keep critical text copyable** - Commands, config, IDs, and error messages should not appear only inside images.
3. **Place visuals near the relevant text** - Introduce the visual before or beside the explanation it supports.
4. **Use one level of detail** - Split visuals when a diagram mixes user flow, architecture, API sequence, and UI state.
5. **Label consistently** - Use the same product terms, shapes, lines, and colors throughout a visual set.
6. **Avoid crossed or ambiguous connectors** - Relationship diagrams should not require decoding.
7. **Annotate sparingly** - Highlight the exact area that matters.
8. **Check accessibility** - Provide alt text, captions, transcript for video, color contrast, and non-color cues.
9. **Check performance** - Prefer efficient formats such as SVG for diagrams and compress screenshots.
10. **Preserve source files** - Store editable source and note update triggers.

## Visual Type Selection

| Reader Need | Prefer |
|-------------|--------|
| Locate a UI control | Screenshot with annotation |
| Understand components and relationships | Boxes-and-arrows |
| Follow decisions or branches | Flowchart |
| See responsibility across actors | Swimlane |
| Understand timing or motion | Video only if static content fails |

## Red Flags

- The visual is not referenced by surrounding text.
- The diagram has no clear starting point.
- Color is the only way to distinguish meaning.
- Screenshot labels are stale or cropped.
- The source file is missing, so future edits require recreating the visual.
