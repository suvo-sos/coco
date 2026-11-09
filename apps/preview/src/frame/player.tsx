import { MuxVideo } from '@videojs/react/media/mux-video';
import { Video, VideoPlayer } from '@videojs/react/video';

import { VideoSkin } from '@/video/skin';

import type { PlaybackProps } from '../shell/params';
import type { ChosenVideo } from './home';

/** Chapters for the Cosmic Dawn demo, served from `apps/preview/public`. */
const CHAPTERS = './cosmic-dawn-chapters.vtt';

/** Page 2: plays the video chosen on Page 1 with the Portfolio skin. */
export function Player({ media, video }: { media?: PlaybackProps; video: ChosenVideo }) {
  return (
    <VideoPlayer poster={video.poster}>
      <VideoSkin>
        {video.kind === 'mux' ? (
          <MuxVideo {...media} src={video.src} playsInline crossOrigin="">
            <track kind="chapters" label="English" srcLang="en" src={CHAPTERS} default />
          </MuxVideo>
        ) : (
          <Video {...media} src={video.src} playsInline crossOrigin="" />
        )}
      </VideoSkin>
    </VideoPlayer>
  );
}
