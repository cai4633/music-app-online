import { xhrOptions, options2 } from "./config"
import { sign_generator } from "common/js/xhr"
import axios from "axios"
import jsonp from "common/js/jsonp"
// const url = "https://u.y.qq.com/cgi-bin/musics.fcg"

const path = "/cgi-bin/musics.fcg"
export function getSingerLists() {
  return axios
    .get(
      "https://www.fastmock.site/mock/352dcbb7ac339fe1b7ed02bbfa3c073b/mock/getsingerlists"
    )
    .then(response => Promise.resolve(response.data.data))
}

export function getSingerSongs(mid: string) {
  const data = {
    comm: { ct: 24, cv: 0 },
    singerSongList: {
      method: "GetSingerSongList",
      param: { order: 1, singerMid: mid, begin: 0, num: 30 },
      module: "musichall.song_list_server"
    }
  }

  const query = Object.assign({}, xhrOptions, {
    "-": "getSingerSong09973278224209037",
    sign: sign_generator(data),
    data: data,
    format: "jsonp"
  })

  return jsonp( "https://u.y.qq.com/cgi-bin/musics.fcg", query, options2 ).then((response: any) => Promise.resolve(response.singerSongList))
}
