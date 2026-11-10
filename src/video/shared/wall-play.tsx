/** @jsxImportSource react */

import { PlayButton as PlayButtonPrimitive } from '@videojs/react';

/**
 * The transport key.
 *
 * It is not a button in the control bar: it is a plate cut to the left wall
 * of the well, so it recedes with the wall at the same 45° chamfer and fills
 * that face edge to edge. One press plays or pauses, and an ended video shows
 * a replay glyph. The three glyphs live in the markup and CSS shows one, so
 * the state comes from the button's `data-paused` / `data-started` /
 * `data-ended` attributes instead of React state.
 */
export function WallPlayKey() {
  return (
    <PlayButtonPrimitive className={'wall-play'}>
      <span className={'wall-play-face'} aria-hidden={'true'} />
      <span className={'wall-play-icon wall-play-icon-play'} aria-hidden={'true'}>
        <svg className={'wall-play-glyph'} viewBox={'0 0 24 24'} focusable={'false'}>
          <path
            d={'M8.6 5.4 18.4 12 8.6 18.6Z'}
            fill={'currentColor'}
            stroke={'currentColor'}
            strokeWidth={'1.7'}
            strokeLinejoin={'round'}
          />
        </svg>
      </span>
      <span className={'wall-play-icon wall-play-icon-pause'} aria-hidden={'true'}>
        <svg className={'wall-play-glyph'} viewBox={'0 0 24 24'} focusable={'false'}>
          <rect x={'7.2'} y={'5.1'} width={'3.7'} height={'13.8'} rx={'1.1'} fill={'currentColor'} />
          <rect x={'13.1'} y={'5.1'} width={'3.7'} height={'13.8'} rx={'1.1'} fill={'currentColor'} />
        </svg>
      </span>
      <span className={'wall-play-icon wall-play-icon-replay'} aria-hidden={'true'}>
        <svg className={'wall-play-glyph'} viewBox={'0 0 24 24'} focusable={'false'}>
          <path
            d={'M12 5.1A6.9 6.9 0 1 0 18.9 12'}
            fill={'none'}
            stroke={'currentColor'}
            strokeWidth={'1.9'}
            strokeLinecap={'round'}
          />
          <path d={'M12 1.9 15.6 5.1 12 8.3Z'} fill={'currentColor'} />
        </svg>
      </span>
    </PlayButtonPrimitive>
  );
}
