# AGENTS.md

**We are building this for our Video.js hackathon and we have to build a custom Video.js player skin for the hackathon.**

## What this is

- A Vite + React project on **Video.js v10 (10.3.0)**, entered in the **Video.js Skins Design Challenge**: design a custom skin for the v10 player.
- The submission needs a public URL, a Video.js v10 player that plays video, and the essential controls working (play/pause, seek, time, volume/mute, fullscreen), responsive at desktop and phone sizes, keyboard operable, readable over bright and dark footage, tap-friendly, with visible focus and reduced-motion support.
- The skin code lives in `src/video/` (`src/video/skin.tsx` + `src/video/skin.css`).
- The preview page lives in `apps/preview/` — `apps/preview/index.html` mounts the player alone at `/`.

## What is on the page right now

- One page, no header and no picker. Background `#A2A09F`.
- **The playback is the stock Video.js v10 skin**: `apps/preview/src/frame/player.tsx` imports `@videojs/react/video/skin.css` and the stock `VideoSkin` from `@videojs/react/video`. The custom skin in `src/video/` is currently **not** used by the preview.
- It plays one video: the Mux HLS asset in `apps/preview/src/frame/home.tsx`.

## The frame around the video

The video sits in a 3D recessed well, built entirely in `apps/preview/src/frame/preview.css` and composed in `apps/preview/src/frame/main.tsx`.

- `.hop-page`: `#A2A09F`, `min-height: 100vh`, padding `clamp(1.5rem, 5vw, 5rem)`, flex column. Two flex spacers split the leftover height **30% above / 70% below** the frame, so the frame sits in the upper third of the page.
- `.preview-player`: `--well-wall: clamp(3rem, 8vw, 8rem)` (115.2px at a 1440px window), `padding: var(--well-wall)`, `max-width: calc(var(--preview-player-width) + var(--well-wall) * 2)`, `overflow: hidden`, **sharp corners** (`border-radius: 0`).
- Video size: `--preview-player-width` defaults to **960px** at 16:9 → **960 × 540**; the frame totals **1190.4 × 770.4** at a 1440px window. It only shrinks below a ~1297px window.
- `.preview-screen`: the video box, `z-index: 12`, radius `--preview-screen-radius` (currently `0`, sharp), plus a `::after` vignette that darkens the edges into the walls.
- `.preview-well`: four wall strips (`.preview-well-wall--top/right/bottom/left`) that recede at 45° into the video. Each is cut with a `clip-path` polygon so the outer rim is long and the edge at the footage is short — that chamfer is the whole 3D read, there is no perspective transform.
- Wall material: gradient `#767473 → #676564 → #535150 → #403e3d → #302e2d`, plus inset shadows on the inner edge and a highlight on the outer edge of each face.

## Things that were built and then removed

Do not bring these back unless asked: the three thin yellow tape strips, the wall-mounted trapezoid play/pause key on the left wall, the corner index marks (dot + number `01–04`), the deck slot in the bottom wall, and the `Enter Deck` button.

## The old K.O. II skin (not in use)

`src/video/` still contains the earlier Docomo K.O. II deck skin — pale moulded plastic deck, olive LCD, chunky keys, clean mode, right-drag seek, flash indicators — and `src/skins/docomo/` is an older saved snapshot. The preview no longer imports either. It is kept as reference work for the next skin.

## Commands

- `npm install`, then `npm run dev` to run it.
- `npm run typecheck` and `npm run build` must stay clean.

## The hackathon brief (pasted from the challenge page)
#Video.js Skins Design Challenge
Join to submit!
$10K
Cash prize
9hr 38m 54s
Until it starts
Trending

Recent

Social

Guidelines

Guidelines
Everything you need to know to participate

Open source license 
By entering this challenge and accepting the guidelines, you license your entry under the Apache License, Version 2.0, so Video.js and others may use, adapt, and redistribute it with credit. You keep ownership of your entry. Any submission may be chosen and inclusion isn’t guaranteed. You accept the guidelines by checking the box when you join the challenge.
Why enter
$10,000 in prizes, judged by the creators of Video.js and Plyr
A chance to see your skin featured by Video.js
Hands-on time with Video.js v10, the ground-up rewrite of the open source player behind video on millions of websites
Theme
Design a custom skin for the Video.js v10 player.
In Video.js v10, a skin is the player’s interface: the UI components plus the styles that present them. Video.js is open source and community-driven, and the player can end up on almost any website, so every skin makes a choice: how much personality it has, how well it fits into someone else’s design, and how far it pushes the controls. The built-in v10 skins show this range. Default is deliberately distinctive, Neutral is quieter and fits more places, Compat keeps things plain for broader browser support, and Scaffold has minimal styling and is a good starting point if you're designing your own skin.
Now show us your design! This is all about craft and fun: the best player, the most unconventional player, the one nobody saw coming. Anything goes, as long as it works and stays usable for everyone.
Design your skin in any tool, then build it one of three ways (see How to enter):
With AI: Describe your design to your coding agent (Claude Code, Codex, Cursor, or your tool of choice) using the Video.js skill.
By hand: Start a skin project with the Video.js CLI and follow the Build your own skin guide.
From scratch: Any framework (HTML, React, Vue, Svelte, or another) and styling approach (CSS, Tailwind, or another), as long as it uses Video.js v10.
Need some inspiration? A player for a video podcast app, a meditation site, a museum archive, or a design portfolio. Anything you can imagine!
Submission requirements
Every submission must include:
A working, publicly accessible URL (no login or local setup) showing your skin on a Video.js v10 player playing video.
A visual and short written description of your design thinking (a few sentences).
Minimum requirements
Each entry is reviewed against these requirements before it's scored. Ensure your skin:
Works: Your URL loads, uses the Video.js v10 player, and plays video.
Has essential controls: Play/pause, seek bar, time, volume/mute, and fullscreen are present and working.
Is responsive: Controls stay visible and usable at desktop and mobile player sizes.
Works with a keyboard: Controls can be reached and operated with a keyboard, and menus can be exited.
Accessibility tips - Several small touches make a skin work for everyone:
Readable over any video: Keep text and icons legible over both bright and dark footage.
Easy to tap: Make controls big enough for a thumb on a phone.
Visible focus: Leave the focus outline on, so keyboard users can see where they are.
Calm on request: If your skin animates, tone it down when reduced motion is turned on.
Evaluation criteria
Entries are scored out of 25 points, plus up to 2 bonus points.
Visual design and originality (10 pts): A distinctive concept with cohesive typography, color, iconography, and layout. Top scores go to memorable, original designs with a clear visual direction and carefully resolved details.
Usability and interaction (5 pts): Intuitive controls and a layout that works across player sizes and touch devices. Controls should be easy to discover and operate, with clear feedback on desktop and mobile.
Accessibility (5 pts): Controls stay readable over any video, keyboard focus is visible, touch targets are comfortable, and motion calms down when reduced motion is on.
Execution and polish (5 pts): A complete, functional skin with consistent styling across controls, menus, and player states. No bugs, broken layouts, or unfinished states.
Bonus points
+1 pt: Host your video on Mux and include the asset’s public playback ID. Your player must play that video, and the asset must stay live through judging. Why Mux? They're the corporate shepherd of Video.js (learn more below).
+1 pt: Put your skin to work. Share the URL of a real, live website of yours (a portfolio, a project, a client site) that plays video with your skin.
Account creation - Video.js is free and open source. Mux’s Free Plan offers you what you need to earn the bonus point, with no promo code or credit card needed. To host your video on Mux:
Sign up at mux.com.
In the dashboard, go to Video > Assets and click Create New Asset to upload a video.
When the status shows Ready, open the ⋮ menu on your asset and choose Copy > Playback ID.
Paste the Playback ID into the submission form, and keep the asset live through judging.
How to enter
Start with your idea: sketch your design in any tool, or skip straight to building.
Get set up: Install Node.js (a free download that the setup commands run on; with AI you won’t use it directly). To build with AI, also have a coding agent such as Claude Code, Codex, or Cursor. To deploy, make a free account with a host such as Vercel or Netlify.
Build your skin. Pick a route:
With AI (easiest if you design more than you code): Paste the AI quickstart prompt from the Build with AI guide into your coding agent to install the Video.js skill, then start a new session. Ask it to help you design your own Video.js skin and choose the video preset when it asks. Then describe your design, share your own icons or images, and iterate.
By hand: Run npx @videojs/cli skin create, choose the video preset when prompted, then follow the Build your own skin guide to preview and build it.
From scratch: Any framework (HTML, React, Vue, Svelte, or another) and styling approach (CSS, Tailwind, or another), as long as it uses Video.js v10.
Optional bonuses (see Bonus points above): 
Mux: Host your video on Mux and play it in your player. 
Live-site:  Move your skin into a real site of yours. If your submitted URL is already a real site, use that.
Check your work: Test your player over a bright and a dark video, resized, and with only a keyboard. With AI, also ask your agent, “Audit my skin for working controls, responsive layout, keyboard access, visible focus, contrast over bright and dark video, tap-friendly controls, and reduced motion. Fix any issues.”
Deploy your skin to Vercel or Netlify for a public URL by running npm run deploy, or ask your agent to do it.
Submit your URL and description. For the bonuses, include your Mux playback ID and live-site URL.
Resources
Video.js skins design inspiration: Read Sam's blog post on how he designed the v10 skins.
Build your own skin: Step-by-step guide to creating a skin project, previewing it, and deploying it. Start from Scaffold, Default, Neutral, or Compat. Want a quick look first? Try the skin sandbox.
Skill + prompts: The Build with AI guide has a quickstart prompt that installs the Video.js skill in your coding agent (Claude Code, Codex, Cursor, or tool of your choice). Then try: “Help me design my own Video.js skin for a podcast player.”
Docs: Read about skins and how to customize them, and a handy icons reference.
Video walkthrough: Watch Sam go from design to a working skin.
Questions?
Questions about the challenge or your submission? Contact Contra at hello@contra.com. Contra will pass technical questions about Video.js v10 to the Video.js team.
The prizes
The following prizes will be distributed to the winners selected by our judges.
🏆 Total: $10,000
$5,000 for 1st place
$3,000 for 2nd place
$2,000 for 3rd place
Video.js Skins Design Challenge Sponsor: Mux is the proud corporate shepherd of Video.js. Mux is video infrastructure for developers. From video streaming to video intelligence and AI-powered context, Mux helps teams do more with video. Stream it, moderate it, search it, analyze it, transform it. https://www.mux.com/
Meet the judges
Industry experts who will evaluate your submissions


Sam Potts
