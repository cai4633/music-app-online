import { getLyric } from "@/api/songs.ts"
import { ERR_OK } from "@/api/config.ts"
export default class Song {
  constructor({ id, mid, singer, name, album, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.image = image
    this.url = url
  }
  _getLyric() {
    return getLyric(this.id).then((res) => {
      if (res.retcode === ERR_OK) {
        this.lyric = res.lyric
      }
    })
  }
}

function getSinger(singers) {
  const ret = singers.map((singer) => {
    return singer.name
  })
  return ret.join("/")
}

export function createSong(song) {
  return new Song({
    id: song.id,
    mid: song.mid,
    name: song.name,
    album: song.album.name,
    image: song.album.pmid && `http://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.pmid}.jpg?max_age=2592000`,
    singer: song.singer ? getSinger(song.singer) : "",
    url: song.purl && `http://ws.stream.qqmusic.qq.com/${song.purl}`,
  })
}
