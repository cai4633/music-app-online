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

export function createSong({ songInfo }) {
  return new Song({
    id: songInfo.id,
    mid: songInfo.mid,
    name: songInfo.name,
    album: songInfo.album.name,
    image: "",
    singer: getSinger(songInfo.singer),
    url: `http://ws.stream.qqmusic.qq.com/${songInfo.id}.m4a?fromtag=46`,
  })
}
