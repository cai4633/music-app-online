export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

export interface Songs {
  id: number;
  mid: string;
  singer: any;
  name: string;
  album: any;
  image: string;
  url: string;
  _getLyric: Function;
  lyric: string;
}
