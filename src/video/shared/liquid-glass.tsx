/** @jsxImportSource react */

/**
 * The liquid-glass filter: fractal noise, softened into a height field, then
 * used to displace whatever is painted behind it. The panel puts this on a
 * backdrop-blurred layer, so the picture under the glass ripples instead of
 * just fogging up.
 *
 * Render it once (in the skin); the CSS refers to it by id.
 */
export const GLASS_FILTER_ID = 'glass-distortion';

export function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id={GLASS_FILTER_ID} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves={2} seed={92} result="noise" />
          <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={85}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
