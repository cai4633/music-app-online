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
  const image = song.album ? song.album.pmid : song.albummid
  return new Song({
    id: song.id || song.songid,
    mid: song.mid || song.songmid,
    name: song.name || song.songname,
    album: song.album ? song.album.name : song.albumname,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${image}.jpg?max_age=2592000`,
    singer: Array.isArray(song.singer) ? getSinger(song.singer) : "",
    url: song.purl && `http://ws.stream.qqmusic.qq.com/${song.purl}`,
  })
}
