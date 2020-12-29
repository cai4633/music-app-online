import { getLyric } from "@/api/songs.ts"
import { ERR_OK } from "@/api/config.ts"

export default class Song {
  id: number
  mid: string
  singer: any
  name: string
  album: any
  image: string
  url: string
  lyric!: string
  constructor(song: any) {
    this.id = song.id
    this.mid = song.mid
    this.singer = song.singer
    this.name = song.name
    this.album = song.album
    this.image = song.image
    this.url = song.url
  }
  _getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return getLyric(this.id).then(res => {
      if (res.retcode === ERR_OK) {
        this.lyric = res.lyric
        return Promise.resolve(this.lyric)
      } else {
        return Promise.resolve("")
      }
    })
  }
}

export function getSinger(singers: any) {
  const ret = singers.map((singer: any) => {
    return singer.name
  })
  return ret.join("/")
}

export function createSong(song: any) {
  const image = song.albummid || song.album.pmid
  return new Song({
    id: song.id || song.songid,
    mid: song.mid || song.songmid,
    name: song.title||song.name || song.songname,
    album: song.album ? song.album.name : song.albumname,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${image}.jpg?max_age=2592000`,
    singer: Array.isArray(song.singer) ? getSinger(song.singer) : "",
    url: song.purl && `http://ws.stream.qqmusic.qq.com/${song.purl}`
  })
}
