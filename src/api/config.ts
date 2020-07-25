const ERR_OK = 0
const queryData = {
  format: "jsonp",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  nobase64: 1,
  songtype: 0
}

const jsonpOptions = {
  format: "json",
  g_tk: 5381,
  uin: 0,
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "h5",
  nobase64: 1,
  songtype: 0,
  needNewCode: 1,
  g_tk_new_20200303: 5381
}
const options = {
  param: "jsonpCallback",
  name: "jsonp2"
}

const options2 = {
  param: "callback",
  name: "callback123"
}

const xhrOptions = {
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  format: "json",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq.json",
  needNewCode: 0
}

const descQuery = {
  "-": "recom7236499801413898",
  sign: "zzaax4h11izv6nff15c4441255ee9ef959d8dacccc3f88",
  data: {
    comm: { ct: 24 },
    category: {
      method: "get_hot_category",
      param: { qq: "" },
      module: "music.web_category_svr"
    },
    recomPlaylist: {
      method: "get_hot_recommend",
      param: { async: 1, cmd: 2 },
      module: "playlist.HotRecommendServer"
    },
    playlist: {
      method: "get_playlist_by_category",
      param: { id: 8, curPage: 1, size: 40, order: 5, titleid: 8 },
      module: "playlist.PlayListPlazaServer"
    },
    new_song: {
      module: "newsong.NewSongServer",
      method: "get_new_song_info",
      param: { type: 5 }
    },
    new_album: {
      module: "newalbum.NewAlbumServer",
      method: "get_new_album_info",
      param: { area: 1, sin: 0, num: 20 }
    },
    new_album_tag: {
      module: "newalbum.NewAlbumServer",
      method: "get_new_album_area",
      param: {}
    },
    toplist: {
      module: "musicToplist.ToplistInfoServer",
      method: "GetAll",
      param: {}
    },
    focus: {
      module: "music.musicHall.MusicHallPlatform",
      method: "GetFocus",
      param: {}
    }
  }
}

const singerQuery = {
  "-": "getUCGI6834091127869455",
  sign: "zzaaj450rsze8bo1wh2f3fef04bda3a286eeb40136f6b80f4a",
  data: {
    comm: { ct: 24, cv: 0 },
    singerList: {
      module: "Music.SingerListServer",
      method: "get_singer_list",
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100,
        sin: 0,
        cur_page: 1
      }
    }
  }
}

const discQuery = {
  recommend_expire: 0,
  sign: "52186982747e1404d426fa3f2a1e8ee4",
  plat: 0,
  uid: 0,
  version: 9108,
  page: 1,
  area_code: 1,
  appid: 1005,
  mid: "286974383886022203545511837994020015101",
  _t: 1545746286
}
const jsonpOpt = {
  param: "callback",
  name: "jsonp8"
}

export {
  ERR_OK,
  queryData,
  options,
  descQuery,
  singerQuery,
  xhrOptions,
  jsonpOptions,
  discQuery,
  jsonpOpt,
  options2
}
