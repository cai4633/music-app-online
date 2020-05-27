const ERR_OK = 0;
const queryData = {
  format: "jsonp",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  nobase64: 1,
  songtype: 0
};
const options = {
  param: "jsonpCallback",
  name: "jsonp2"
};

const descQuery = {
  "-": "recom7236499801413898",
  g_tk: 5381,
  sign: "zzaax4h11izv6nff15c4441255ee9ef959d8dacccc3f88",
  loginUin: 0,
  hostUin: 0,
  format: "json",
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  platform: "yqq.json",
  needNewCode: 0,
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
};

export { ERR_OK, queryData, options, descQuery };
