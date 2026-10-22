# Reference build brief — interactive birthday journey

## Scope and permission boundary

The supplied Instagram reel by DilSeCraft was observed through normal playback in Tanzil's signed-in browser. The build uses only visible interaction ideas and does not copy the creator's assets, exact text, branding, code, or private implementation.

## Focused journey

Create a link Tanzil can send to his girlfriend so she can move through a short, mobile-friendly birthday experience with one clear interaction per scene.

## Findings ledger

| ID | Finding | Class | Confidence | Build implication |
| --- | --- | --- | --- | --- |
| F1 | The reference uses a sequence of single-action screens to build anticipation. | Observed | High | Use a seven-scene linear journey with progress feedback. |
| F2 | The visible sequence includes an envelope, lights, cake, wish, note, and final greeting. | Observed | High | Retain the emotional rhythm while writing original scenes, copy, and artwork. |
| F3 | Personalization is carried by the recipient's name and letter. | Observed | High | Keep recipient, sender, note, and photos easy to replace in one config area. |
| F4 | The reference includes touch-like interactions. | Observed | High | Support pointer, tap, and keyboard interactions with accessible controls. |
| F5 | The source does not reveal its implementation, hosting, editing, or delivery system. | Unknown | High | Use original buildless HTML, CSS, and JavaScript with no inferred private architecture. |

## Adaptation decisions

- Original rose, cream, plum, and gold art direction drawn entirely with HTML/CSS.
- Add a hold-to-wish interaction, optional generated chimes, a three-photo memory stack, reduced-motion support, and keyboard support.
- Use generic "my love" copy until Tanzil supplies his girlfriend's name, photos, and personal note.
- Avoid external trackers, accounts, uploads, databases, and third-party assets.
- Make the four-year relationship part of the interaction through four unlockable year stars, rather than mentioning the duration only in static copy.
- Build the emotional arc around Tanzil's confirmed statement that his girlfriend helped him build himself. Do not invent specific dates, places, events, or private memories.
- Rewrite the cake, wish, letter, and finale to move from reflection to gratitude and then toward a shared future.

## Acceptance criteria

- The full experience works on a narrow mobile viewport and desktop.
- Every scene has one obvious next action, with progress indicated.
- Cake cutting works by swipe, tap, Enter, or Space.
- Wish interaction completes by press-and-hold and has keyboard support.
- Photos and the personal note can be replaced without restructuring the experience.
- Replay resets the interactive state.
- No proprietary media or copied source text is included.
- Each of the four year stars reveals a distinct message and all four must be opened before continuing.
- The letter connects four years of support with Tanzil's growth without claiming unsupported biographical details.
