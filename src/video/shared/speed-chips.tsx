/** @jsxImportSource react */

import { useEffect, useRef, useState } from 'react';

/**
 * The speed chips: 0.5x / 1x / 1.5x / 2x in the bar, next to the settings and
 * screen keys. They read and write the video element's own `playbackRate`, so
 * the settings menu's Speed row, the keyboard and the chips always agree.
 */
const RATES = [0.5, 1, 1.5, 2] as const;

export function SpeedChips() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>('.ko-skin video');
    if (!video) return;

    videoRef.current = video;

    const sync = () => setRate(video.playbackRate);
    sync();
    video.addEventListener('ratechange', sync);

    return () => video.removeEventListener('ratechange', sync);
  }, []);

  const apply = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = value;
    setRate(value);
  };

  return (
    <div className={'vo-speeds'} role="group" aria-label="Playback speed">
      {RATES.map((value) => (
        <button
          key={value}
          type="button"
          className={'vo-speed'}
          aria-pressed={Math.abs(rate - value) < 0.01}
          onClick={() => apply(value)}
        >
          {value}x
        </button>
      ))}
    </div>
  );
}
