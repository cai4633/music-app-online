import {getSinger} from 'common/js/song'

export interface AlbumCls {
  id: number
  name: string
  mid: string
  photo: string
  singer: string
}

export class Album {
  id: number
  name: string
  mid: string
  photo: string
  singer: string
  constructor(album: AlbumCls) {
    this.id = album.id
    this.name = album.name
    this.mid = album.mid
    this.photo = album.photo
    this.singer = album.singer
  }
}

export function createAlbum(album: any) {
  return new Album({
    id: album.id,
    name: album.name,
    mid: album.mid,
    singer: getSinger(album.singers),
    photo: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${album.photo.pic_mid}.jpg?max_age=2592000`
  })
}
