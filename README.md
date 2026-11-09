# Hop Steps

A Video.js v10 video skin for React, styled with CSS. It started from the Scaffold skin.

## Design thinking

Hop Steps throws away the flat seek bar. The timeline is a staircase of 12 steps rising left to right, and a squashy blue ball hops up the steps as the video plays — and squashes flat when you pause. Play is the ball itself: a big blue ball in the centre, and a blue ball in the bar. Everything else stays honest: round 44px buttons, a floating dark pill bar that stays readable over bright and dark video, visible focus, full keyboard control, and no hopping at all when reduced motion is on. Crazy to look at, still a real player to use.

Mux playback ID (bonus): the preview plays Mux asset `83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s` (NASA Cosmic Dawn trailer, HLS).

## One minimal page

White page, nothing on top — just the player, playing one video: `export-1794107467997.mp4` (478 MB, the user's own video from his Mac Mini, bundled in `apps/preview/public/`). No header, no icons, no picker, no upload.

## Develop

```sh
npm run dev
```

The workbench opens your skin in a slimmed-down version of the Video.js sandbox. It plays NASA's Cosmic Dawn trailer from Mux, with chapters; change the media in `apps/preview/src/frame/player`. The options panel sets the player's width and aspect ratio, the color scheme, text direction, and language, and playback options such as autoplay, muted, loop, and preload. The arrow button opens the preview on its own. The settings live in the URL, so a link such as `/?width=384&ratio=9:16&dir=rtl&locale=ar` opens the workbench in that state, and `/preview.html#width=384&ratio=9:16` opens the preview alone.

## Deploy

```sh
npm run deploy
```

It asks where to deploy the workbench: Vercel, Netlify, or Cloudflare Pages. Name one to skip the question, such as `npm run deploy vercel`. The first time, the host's CLI signs you in and creates the project, then every run prints the URL. Vercel and Netlify deploy to a preview URL you can share; to deploy to production instead, add `--prod` to the `deploy:netlify` script, or to both commands in `deploy:vercel`.

To deploy on every push instead, put the project on GitHub and import it on Vercel or Netlify; `vercel.json` and `netlify.toml` already describe the build. The build uses relative URLs, so `dist/` also works on any static host, including in a subfolder.

## Where things live

- `src/`: your skin, and only your skin. Keep, rewrite, or delete any of it.
  - `src/video/`: the skin component and its parts.
  - `src/styles/`: theme tokens and shared styles the skin imports, when it started from a packaged skin.
  - `src/skin.css`: global styles for the skin.
- `apps/preview/`: the workbench that previews the skin. You don't need to change it.
  - `src/shell/`: the Shadcn shell.
  - `src/frame/`: the page the shell frames. `player` mounts your skin in a player and sets the media it plays.
  - `public/`: files the preview serves, such as the chapters track.
- `vercel.json`, `netlify.toml`: how those hosts build the workbench.
- `skin.json`: what this skin is built from. Keep it; it records the Video.js version the skin was created with.

## Learn more

- [Build your own skin](https://videojs.org/docs/framework/react/guides/build-your-own-skin)
- [Customize skins](https://videojs.org/docs/framework/react/guides/customize-skins)
- [UI components](https://videojs.org/docs/framework/react/guides/ui-components)
