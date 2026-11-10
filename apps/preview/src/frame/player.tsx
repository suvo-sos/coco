import { MuxVideo } from '@videojs/react/media/mux-video';
import { Video, VideoPlayer, VideoSkin } from '@videojs/react/video';
import '@videojs/react/video/skin.css';

import type { PlaybackProps } from '../shell/params';
import type { ChosenVideo } from './home';

/** Page 2: plays the chosen video with the stock Video.js skin. */
export function Player({ media, video }: { media?: PlaybackProps; video: ChosenVideo }) {
  return (
    <VideoPlayer poster={video.poster}>
      <VideoSkin>
        {video.kind === 'mux' ? (
          <MuxVideo {...media} src={video.src} playsInline crossOrigin="anonymous" />
        ) : (
          <Video {...media} src={video.src} playsInline crossOrigin="" />
        )}
      </VideoSkin>
    </VideoPlayer>
  );
}
