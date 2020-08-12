declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}

declare module "create-keyframe-animation"
declare module "js-base64"
declare module "*.png"

declare interface Songs {
  id: number
  mid: string
  singer: any
  name: string
  album: any
  image: string
  url: string
  _getLyric: Function
  lyric: string
}

declare interface AlbumCls {
  id: number
  name: string
  mid: string
  photo: string
  singer: string
}

declare interface MyResponse extends Response {
  code: number
  data: any
  songlist?: any[]
  new_album?: {
    data: {
      albums: any[]
    }
  }
}

declare interface SongItem {
  mid: string
  id: number
  name: string
  album: {
    name: string
    mid: string
  }
}

declare interface SongData {
  song: {
    list: SongItem[]
    curnum: number
    curpage: number
    totalnum: number
  }
  zhida: {
    type: number
    zhida_singer: string[]
  }
}

declare interface RankItem {
  id: number
  listenCount: number
  picUrl: string
  songList: Array<{ singername: string; songname: string }>
  topTitle: string
  type: number
}

