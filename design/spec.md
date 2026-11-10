# Docomo skin — design spec

Standing document for the new skin. Filled in as the design is agreed; each
section records what is decided, not what is planned.

## The room

The frame is already built and stays: a page of `#A2A09F` with the video set
into a 3D well. The four wall faces recede at 45°, cut with `clip-path` so the
outer rim is long and the edge at the footage is short. Wall thickness is
`--well-wall`, `clamp(3rem, 8vw, 8rem)`, which is the number every wall-mounted
part is measured against.

The skin's job is to inhabit that room, so skin parts that sit on a wall read
the wall thickness from it and match its chamfer.

## Controls

| Part | Where | State |
| --- | --- | --- |
| Transport (play / pause / replay) | Left wall, filling the face | `data-paused`, `data-started`, `data-ended` |
| Progress bar | Bottom wall, filling the face | `--media-slider-fill`, `--media-slider-buffer` |

### The transport key

- **Shape** — the button's box is the left wall's whole face, edge to edge, so
  the entire wall is the hit area. On it rests a rounded key, `0.7rem`
  corners, **taller than it is wide**: 72% of the wall across and 150% down,
  pushed against the footage so only 4% of wall separates the key from the
  video and the open wall sits behind it. At a 1440px window that is
  ~83 × 173px before the
  turn, and it holds that proportion at every player size because both sides
  come from the wall thickness. Inset 20% from each side so the rounded
  corners are never cut off by the room.
- **Perspective** — the key lies on the wall, so its near edge at the page
  surface stands taller than its far edge at the footage. One transform does
  it: `perspective(120px) rotateY(40deg)`, giving roughly a 65% taper (left
  edge ≈230px, right ≈139px at a 1440px window) and the matching tilt of the
  top and bottom edges. Both numbers are tokens on `.wall-play`
  (`--wall-play-perspective`, `--wall-play-turn`); lower the perspective or
  raise the turn to make the near edge taller still.
- **Material** — violet gradient face, outer rim to footage
  (`rgb(214,202,254)` → `rgb(158,129,254)`), a 2px `rgb(50,50,50)` border with
  a **5px** edge facing the footage, and a violet `drop-shadow` halo.
- **Press** — the key travels 3px into the well along the wall's recession,
  the thick edge flattens from 5px to 2px, and the face dims slightly.
- **Glyph** — white (`#fff`) with a 1px dark shadow so its edge holds against
  the violet, sized at 50% of the wall thickness (58px at a 1440px window,
  24px at phone width). Play triangle, two pause bars, and a replay arc for
  an ended video. The glyph carries the **same** `perspective() rotateY()`
  turn as the key, so its near edge stands taller than its far edge too
  (≈69px against ≈51px at that size) instead of floating flat on a turned
  face.
- **Focus** — a 3px white ring around the rounded key, offset 2px.
- **Motion** — key and face transitions ride `--media-duration-fast` and are
  switched off under `prefers-reduced-motion: reduce`.

## Not yet designed

Time readout, volume, captions, settings, fullscreen, the control bar, the
loading and error states. The stock workbench bar stays in place and working
until each of those is replaced.

### The progress bar

- **Shape** — the same trick as the key: a plate cut to the bottom wall's
  trapezoid (`wall 0 → 100% 100%`), covering that face, so the bar *is* the
  wall.
- **Perspective** — both plates are cut with the wall's own chamfer formula, so
  the rim at the page surface is the long one and the rim at the footage is
  short by exactly one wall thickness on each end: a 45° taper, same as the
  walls behind them. Nothing is square.
- **Shading** — light runs along each plate's depth axis, from the long near
  rim to the short far rim, so the plates are lit the way their walls are:
  side to side on the key, bottom to top on the bar. Contents (fill, buffer,
  playhead) are shaded on the same axis and never along the bar's length.
- **Material** — plate `rgb(50,50,50)`, a 5px `rgb(28,27,32)` edge on the rim
  that meets the footage and 2px on the other rims, the played share in the
  key's violet (`rgb(226,216,255)` → `rgb(150,120,248)`), the buffer
  `rgb(88,86,96)`, and the same violet halo.
- **Behaviour** — the whole face is the slider: click or drag anywhere to
  seek, arrow keys when focused. Fill and buffer come from the primitive's
  `--media-slider-fill` / `--media-slider-buffer`, so nothing is duplicated in
  React state. The playhead is a fader cap, 16% of the wall wide and 62% tall,
  in the same violet with a 2px ink border.
- **Focus** — 3px white ring inset in the plate; the cap takes a white border
  when it has focus.
- **Motion** — no transitions on the geometry; hover brightens the fill.
