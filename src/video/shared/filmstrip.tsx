/** @jsxImportSource react */

import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';

/**
 * A thin strip of real frames that is the seekbar — the timeline a
 * video editor would show. The whole strip stays at full brightness;
 * a thick red playhead marks the current time and slides along with
 * playback.
 *
 * The frames are not a sprite sheet shipped with the video: they are
 * captured from the file itself. A hidden, muted copy of the video is
 * seeked through {FRAME_COUNT} evenly spaced points, each frame is
 * drawn to a small canvas and kept as a data URL. Capturing starts
 * after the player is ready, one frame at a time, so the strip fills
 * in left to right instead of blocking the first paint.
 *
 * Click (or drag) on the strip to seek. It is decoration for screen
 * readers — the real slider underneath still owns keyboard and
 * accessibility behaviour.
 */

/** Frames across the strip. More frames = a finer timeline, but each is a real seek in the file. */
const FRAME_COUNT = 24;

/** Captured at this size: sharp enough at ~32px tall, small enough to keep 24 of them in memory. */
const FRAME_WIDTH = 160;
const FRAME_HEIGHT = 90;

/** A seek slower than this is treated as a failure, so a huge file never wedges the strip. */
const SEEK_TIMEOUT_MS = 4000;

/** How long to wait after metadata before touching the file — the player gets to show the poster first. */
const START_DELAY_MS = 400;

function seekAndWait(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('seek timeout'));
    }, SEEK_TIMEOUT_MS);

    const cleanup = () => {
      window.clearTimeout(timer);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
    };
    const onSeeked = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error('seek failed'));
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    video.currentTime = time;
  });
}

/**
 * After a seek, Safari can fire `seeked` before the new frame is
 * actually presented. If the browser has requestVideoFrameCallback,
 * wait one presented frame (with a short cap) before drawing.
 */
function waitForPaintedFrame(video: HTMLVideoElement): Promise<void> {
  if (typeof video.requestVideoFrameCallback !== 'function') return Promise.resolve();
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, 250);
    video.requestVideoFrameCallback(() => {
      window.clearTimeout(timer);
      resolve();
    });
  });
}

export function FilmStrip() {  const [frames, setFrames] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const video = host?.closest('.blood-skin')?.querySelector('video') as HTMLVideoElement | null;
    if (!host || !video) return;
    videoRef.current = video;

    let cancelled = false;
    let running = false;
    let done = false;
    let generation = 0;
    let startTimer = 0;
    let thumb: HTMLVideoElement | null = null;

    const dropThumb = () => {
      if (!thumb) return;
      thumb.removeAttribute('src');
      thumb.load();
      thumb.remove();
      thumb = null;
    };

    const stop = () => {
      cancelled = true;
      generation += 1;
      running = false;
      window.clearTimeout(startTimer);
      dropThumb();
    };

    const capture = async () => {
      if (running) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0.25) return;

      running = true;
      const myGeneration = generation;
      const current = () => !cancelled && myGeneration === generation;
      let captured = 0;

      setFailed(false);
      setFrames(Array.from({ length: FRAME_COUNT }, () => ''));

      const el = document.createElement('video');
      thumb = el;
      el.muted = true;
      el.preload = 'auto';
      el.playsInline = true;
      const crossOrigin = video.getAttribute('crossorigin');
      if (crossOrigin !== null) el.setAttribute('crossorigin', crossOrigin);
      el.src = video.currentSrc || video.src;
      el.style.cssText =
        'position:fixed;top:0;left:-9999px;width:2px;height:2px;opacity:0;pointer-events:none;';
      document.body.appendChild(el);

      const canvas = document.createElement('canvas');
      canvas.width = FRAME_WIDTH;
      canvas.height = FRAME_HEIGHT;
      const context = canvas.getContext('2d');
      if (!context) {
        setFailed(true);
        running = false;
        dropThumb();
        return;
      }

      try {
        if (el.readyState < 1) {
          await new Promise<void>((resolve, reject) => {
            const cleanup = () => {
              el.removeEventListener('loadedmetadata', onLoaded);
              el.removeEventListener('error', onError);
            };
            const onLoaded = () => {
              cleanup();
              resolve();
            };
            const onError = () => {
              cleanup();
              reject(new Error('load failed'));
            };
            el.addEventListener('loadedmetadata', onLoaded);
            el.addEventListener('error', onError);
          });
        }

        if (!current()) return;

        for (let index = 0; index < FRAME_COUNT; index += 1) {
          if (!current()) return;
          // Land in the middle of each slice, never exactly on 0 —
          // the first frame of many files is black.
          const time = (duration * (index + 0.5)) / FRAME_COUNT;
          await seekAndWait(el, time);
          if (!current()) return;
          await waitForPaintedFrame(el);
          if (!current()) return;
          context.drawImage(el, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
          const url = canvas.toDataURL('image/jpeg', 0.7);
          captured += 1;
          setFrames((previous) => {
            if (previous[index] === url) return previous;
            const next = previous.slice();
            next[index] = url;
            return next;
          });
        }
      } catch {
        // Cross-origin video without CORS headers, broken file, or a
        // seek that never finished. If not a single frame arrived,
        // hide the strip — better than a permanent row of empty boxes.
        if (current() && captured === 0) setFailed(true);
      } finally {
        if (myGeneration === generation) {
          running = false;
          done = true;
          dropThumb();
        }
      }
    };

    const schedule = () => {
      if (running || done || cancelled) return;
      window.clearTimeout(startTimer);
      startTimer = window.setTimeout(() => {
        if (!cancelled) void capture();
      }, START_DELAY_MS);
    };

    const onNewSource = () => {
      stop();
      cancelled = false;
      done = false;
      generation += 1;
      setFrames([]);
      setFailed(false);
      videoRef.current = video;
    };

    if (video.readyState >= 1) schedule();
    else video.addEventListener('loadedmetadata', schedule, { once: true });
    video.addEventListener('canplay', schedule);
    video.addEventListener('loadstart', onNewSource);

    return () => {
      stop();
      video.removeEventListener('loadedmetadata', schedule);
      video.removeEventListener('canplay', schedule);
      video.removeEventListener('loadstart', onNewSource);
      videoRef.current = null;
    };
  }, []);

  const seekTo = (clientX: number) => {
    const video = videoRef.current;
    const host = hostRef.current;
    if (!video || !host) return;
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const rect = host.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * duration;
  };

  /** Keep clicks and drags on the strip from reaching the play/pause tap. */
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    seekTo(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    // No stopPropagation here: the slider still needs the move to
    // place its hover preview. It has no capture of its own, so it
    // only updates the pointer value — it never seeks on its own.
    seekTo(event.clientX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.stopPropagation();
  };

  return (
    <>
      <div
        ref={hostRef}
        className="hop-filmstrip"
        data-state={failed ? 'failed' : undefined}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={(event) => event.stopPropagation()}
      >
        {Array.from({ length: FRAME_COUNT }, (_, index) => {
          const url = frames[index];
          return (
            <span
              key={index}
              className="hop-filmstrip-cell"
              data-loaded={url ? '' : undefined}
              style={url ? { backgroundImage: `url(${url})` } : undefined}
            />
          );
        })}
      </div>
      {/* Sibling of the strip, not a child: the strip clips its frames,
          this must stay taller than the strip. */}
      <span className="hop-filmstrip-playhead" />
    </>
  );
}
