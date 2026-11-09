# AGENTS.md

We are building this for the Video.js hackathon, where we have to build the next video player — like we are redesigning the wheel.

## What this is

- A custom skin for the Video.js v10 player (Vite + React, Video.js 10.3.0).
- The skin lives in `src/video/` (edit `src/video/skin.tsx` and `src/video/skin.css`).
- The preview page lives in `apps/preview/` — open `/preview.html` for the clean player page.

## The player right now

- **The preview renders the custom Hop Steps skin**: `apps/preview/src/frame/player.tsx` imports `VideoSkin` from `@/video/skin`. The stock Video.js default skin is one import away — swap `VideoSkin` back to `@videojs/react/video` plus `@videojs/react/video/skin.css`.
- One page, white background, just the player — no header, no picker, no upload.
- It plays one video: `video-4k60.mp4` in `apps/preview/public/`.
- Clean mode: by default the video shows nothing at all, even on hover. Move the cursor to the bottom and the bottom bar shows: the thin seekbar, the time, and all the buttons — play, volume, captions, settings, AirPlay, PiP, fullscreen, and fill window (player as big as the browser window, not display fullscreen; click again or Esc to exit). The big centre play stays hidden (the bottom play button does its job), and so does the top bar. A 100ms loop decides: the bar shows only while the cursor is over the bottom bar and has really moved in the last 1.5s — small mouse shakes under 20px don't count — so it can never get stuck showing or stuck hidden. Clicking the seekbar focuses its thumb, but that alone never pins the bar open — only a keyboard (Tab) focus does — and a right-drag whose release is missed outside the window ends itself on the next press or move.
- Seeking has no dark pill or track background — the time sits straight on the video. Right-click and drag anywhere on the player to seek: left goes back, right goes forward, full player width covers the whole video. A right-click without dragging skips 10 seconds instead: right half forward, left half back, with a YouTube-style dark circle (chevrons + seconds) on that side — quick clicks in the same direction add up to 20s, 30s, and so on. Seeks are throttled to one per animation frame (fastSeek where the browser has it), so scrubbing a big file stays smooth.
- The seekbar itself is now a thin filmstrip of real frames, like an editor's timeline (`shared/filmstrip.tsx`) — the red track, fill and thumb are hidden, and the strip fills the slider row. The 24 frames are captured from the file itself: a hidden muted copy of the video is seeked through the timeline and each frame is drawn to a small canvas, so there is no sprite sheet to ship. Played frames are bright; the rest are not dimmed at all — a thick 4px red playhead, pinned to `--media-slider-fill`, slides across the full-brightness strip as the video plays, standing a little taller than the strip itself (26px strip, 34px playhead). Click or drag the strip to seek; keyboard still works through the invisible slider. It lives inside the bottom bar, so it fades in and out with it and never shows in clean mode. If the frames cannot be captured, the red bar comes back as a fallback.
- Mouse wheel over the player is volume: up is louder, down is quieter, scrolling up also unmutes. There is no centre pill — the inline volume bar is the only readout.
- The volume button is a thick-stroked speaker that unfolds into a horizontal volume bar the instant the cursor touches it — no popup, no delay, just the icon swapping for the bar while the control widens. Once open, moving the mouse left and right scrubs the volume relative to where the pointer entered (reaching the button never jumps the level); a still click toggles mute. Wheel, arrows and the inline bar still work, because the control reads and writes the video element itself. Focused with the keyboard it stays open, arrows/Home/End adjust it and `m` mutes.
- All icons are Lucide (lucide-react): play/pause are filled, the rest are clean strokes. The fill-window button used to be hand-drawn SVG — now Lucide Expand/Shrink. The buffering spinner is LoaderCircle with its own hop-spin animation in skin.css.
- Play/pause is a click on the video, double-click is fullscreen, keyboard still works (Space, arrows, F, M). Every play/pause flashes a blue ball with the play/pause icon in the centre, YouTube-style, then it fades away.

## Commands

- `npm install`, then `npm run dev` to run it.
- `npm run typecheck` and `npm run build` must stay clean.

and we are building this for this hackathon - Tag badge
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
