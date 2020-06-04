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
    image: "",
    singer: getSinger(song.singer),
    url: song.purl && `http://ws.stream.qqmusic.qq.com/${song.purl}`,
  })
}
