export interface Playlist {
  id: number,
  name: string,
  img_link: string,
  musics?: any[]
}

export interface StreamState {
  playing: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  canplay: boolean;
  error: boolean;
}
