export interface Singers {
  id: number;
  mid: string;
  name: string;
}

export default class Singer {
  id: number;
  mid: string;
  name: string;
  avatar: string;
  constructor(singer: Singers) {
    this.id = singer.id;
    this.name = singer.name;
    this.mid = singer.mid;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.mid}.jpg?max_age=2592000`;
  }
}
