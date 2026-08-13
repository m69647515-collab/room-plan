# SignalDesk — Participant README

## Goal
Repair the JavaScript triage logic so alerts are filtered and ordered according to the queue rules.

## Rules
- You may edit only JavaScript.
- Do not change HTML/CSS.
- Preserve acknowledgement behavior and the existing filters.
- AI assistance is allowed; record your usage in the post-mortem.

## Run
Open `index.html` in a browser. Run the visible checks with `node tests/run_visible.js`.

At minute 30 the organizer will release additional cases. Some cases deliberately contain equal-priority items to test whether your ordering rule preserves the intended semantics rather than merely producing a plausible order.
