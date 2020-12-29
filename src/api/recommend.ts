import jsonp0 from "@/common/js/jsonp"
import { queryData, options, options2, descQuery, xhrOptions } from "./config"
import { sign_generator } from "common/js/xhr"

function getRecommend() {
  const data = Object.assign({}, queryData, {
    uin: 0,
    platform: "h5",
    needNewCode: 1
  })
  return jsonp0(
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
    data,
    options
  ).then((res: any) => {
    return Promise.resolve(res)
  })
}

function getAlbums() {
  // 由于歌单详情需要验证referer,暂时去获取首发专辑
  const param = Object.assign({}, xhrOptions, descQuery, { format: "jsonp" })
  return jsonp0("https://u.y.qq.com/cgi-bin/musics.fcg", param, options2).then(
    (res: any) => {
      return Promise.resolve(res)
    }
  )
}

function getCdInfoById(albumMid: string) {
  const data = {
    comm: { ct: 24, cv: 10000 },
    albumSonglist: {
      method: "GetAlbumSongList",
      param: {
        albumMid: albumMid,
        albumID: 0,
        begin: 0,
        num: 10,
        order: 2
      },
      module: "music.musichallAlbum.AlbumSongList"
    }
  }
  const param = Object.assign({}, xhrOptions, {
    "-": "albumSonglist8360672146275778",
    sign: sign_generator(data),
    format: "jsonp",
    data
  })

  const ret = jsonp0("https://u.y.qq.com/cgi-bin/musics.fcg", param, {
    param: "callback",
    name: "callback4"
  })
  return ret
    .then((response: any) => {
      return Promise.resolve(response.albumSonglist)
    })
}

export { getAlbums, getRecommend, getCdInfoById }
