/** @jsxImportSource react */

import { TimeSlider as TimeSliderPrimitive } from '@videojs/react';

/**
 * The progress bar.
 *
 * It is the bottom wall of the well: a plate cut to that face's own trapezoid,
 * so the elapsed film fills the wall from the outer rim inward. The whole face
 * is the slider — a click or drag anywhere on it seeks — and the buffer and the
 * played share come straight from the video, not from React state.
 */
export function WallSeek() {
  return (
    <TimeSliderPrimitive.Root className={'wall-seek'} thumbAlignment={'edge'}>
      <TimeSliderPrimitive.Track className={'wall-seek-track'}>
        <TimeSliderPrimitive.Buffer className={'wall-seek-buffer'} />
        <TimeSliderPrimitive.Fill className={'wall-seek-fill'} />
      </TimeSliderPrimitive.Track>
      <TimeSliderPrimitive.Thumb className={'wall-seek-thumb'} />
    </TimeSliderPrimitive.Root>
  );
}
