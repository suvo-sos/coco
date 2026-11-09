/** The one video this page plays. */
export interface ChosenVideo {
  id: string;
  title: string;
  src: string;
  poster?: string;
  kind: 'mux' | 'mp4';
}

export const SINGLE_VIDEO: ChosenVideo = {
  id: 'video-4k60',
  title: 'Video 4K60',
  src: './video-4k60.mp4',
  kind: 'mp4',
};
