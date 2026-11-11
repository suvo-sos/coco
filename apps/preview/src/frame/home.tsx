/** The one video this page plays. */
export interface ChosenVideo {
  id: string;
  title: string;
  src: string;
  poster?: string;
  kind: 'mux' | 'mp4';
}

/**
 * The file in `apps/preview/public/`, served at the document's own path so it
 * works at a domain root or in a subfolder. The Mux asset the skin was built
 * against (`pEPlVJYPMuiTQFXHuBrxKEou2702HeT1zLxkhRp0098uE`) is kept on file for
 * the submission; swap `src` + `kind` back to `mux` to stream it again.
 */
export const SINGLE_VIDEO: ChosenVideo = {
  id: 'docomo-local',
  title: 'Docomo',
  src: './1794394115060191.mp4',
  kind: 'mp4',
};
