(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67f9128a"],{"06ee":function(t,e,n){},"0f81":function(t,e,n){"use strict";var a=n("06ee"),s=n.n(a);s.a},"4f0d":function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return l}));n("d3b7");var a=n("d89f"),s=n("fa9d"),i=n("bc3a"),r=n.n(i),o=n("7776");function c(){return r.a.get("https://www.fastmock.site/mock/352dcbb7ac339fe1b7ed02bbfa3c073b/mock/getsingerlists").then((function(t){return Promise.resolve(t.data.data)}))}function l(t){var e={comm:{ct:24,cv:0},singerSongList:{method:"GetSingerSongList",param:{order:1,singerMid:t,begin:0,num:30},module:"musichall.song_list_server"}},n=Object.assign({},a["g"],{"-":"getSingerSong09973278224209037",sign:Object(s["a"])(e),data:e,format:"jsonp"});return Object(o["a"])("https://u.y.qq.com/cgi-bin/musics.fcg",n,a["e"]).then((function(t){return Promise.resolve(t.singerSongList)}))}},5362:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"music-list"},[n("h1",{ref:"title"},[t._v(t._s(t.title))]),n("div",{ref:"banner",staticClass:"banner",style:"background-image:url("+t.bgImg+")"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.playbtn,expression:"playbtn"}],staticClass:"playbtn",on:{click:t.random}},[n("icon-svg",{attrs:{icon:"#el-icon-play1"}}),n("span",[t._v("随机播放全部")])],1)]),n("div",{ref:"layer",staticClass:"bg-layer"}),n("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,probeType:3},on:{scroll:t.getY}},[n("song-list",{ref:"songList",attrs:{songs:t.songs,rank:t.rank},on:{select:t.playlistInit}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-wrap"},[n("loading")],1),n("go-back",{staticClass:"icon-wrap",nativeOn:{click:function(e){return t.back(e)}}})],1)},s=[],i=n("d4ec"),r=n("bee2"),o=n("262e"),c=n("2caf"),l=n("9ab4"),u=n("60a3"),f=n("99f1"),b=n("e9fc"),g=n("1cb8"),h=n("2a35"),d=n("2785"),p=n("248e"),v=n("4bb5"),y=function(t){Object(o["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.top=0,t.playbtn=!0,t.layerTop=0,t.bgHeight=0,t}return Object(r["a"])(n,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){t.$refs.layer&&t.$refs.banner&&(t.layerTop=t.$refs.layer.offsetTop,t.bgHeight=t.$refs.banner.offsetHeight)}))}},{key:"random",value:function(){this.songs.length&&this.randomPlay(this.songs)}},{key:"playlistInit",value:function(t,e){this.selectPlay({list:this.songs,index:e})}},{key:"handlePlaylist",value:function(){var t=this.playlist.length?45:0;this.$refs.list&&(this.$refs.list.$el.style.bottom="".concat(t,"px"),this.$refs.list.refresh())}},{key:"getY",value:function(t){var e=10,n=this.layerTop+t,a=this.$refs.title.offsetTop+this.$refs.title.offsetHeight+e,s=this.$refs.banner.style;n>=a?(this.$refs.layer.style.transform="translateY(".concat(t,"px)"),this.playbtn=!0,s.height="".concat(this.bgHeight,"px"),s.zIndex="3",t>0&&(s.transform="scale(".concat(1+t/this.bgHeight,")"))):(this.playbtn=!1,s.height=a+"px",s.zIndex="50")}},{key:"back",value:function(){this.$router.back()}},{key:"_refresh",value:function(){this.$refs.list.refresh()}}]),n}(Object(u["b"])(p["b"]));Object(l["a"])([Object(u["c"])()],y.prototype,"songs",void 0),Object(l["a"])([Object(u["c"])()],y.prototype,"title",void 0),Object(l["a"])([Object(u["c"])()],y.prototype,"bgImg",void 0),Object(l["a"])([Object(u["c"])({default:!1})],y.prototype,"rank",void 0),Object(l["a"])([Object(v["c"])("SET_PLAYLIST")],y.prototype,"setPlaylist",void 0),Object(l["a"])([Object(v["a"])("selectPlay")],y.prototype,"selectPlay",void 0),Object(l["a"])([Object(v["a"])("clearSongList")],y.prototype,"clearSongList",void 0),Object(l["a"])([Object(v["a"])("randomPlay")],y.prototype,"randomPlay",void 0),y=Object(l["a"])([Object(u["a"])({components:{SongList:f["a"],Scroll:b["a"],Loading:g["a"],IconSvg:h["a"],GoBack:d["a"]}})],y);var m=y,j=m,O=(n("a807"),n("2877")),k=Object(O["a"])(j,a,s,!1,null,"3061062e",null);e["a"]=k.exports},"7d1b":function(t,e,n){},a807:function(t,e,n){"use strict";var a=n("7d1b"),s=n.n(a);s.a},c5ef:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"singer-details"},[n("music-list",{ref:"musicList",attrs:{songs:t.songs,title:t.singer.name,bgImg:t.singer.avatar}})],1)},s=[],i=(n("d81d"),n("d4ec")),r=n("bee2"),o=n("262e"),c=n("2caf"),l=n("9ab4"),u=n("60a3"),f=n("4f0d"),b=n("8f62"),g=n("d89f"),h=n("a201"),d=n("7693"),p=n("5362"),v=n("4bb5"),y=function(t){Object(o["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.songs=[],t}return Object(r["a"])(n,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){t.singer.mid||t.$router.push({path:"/singer"}),t._getSingerSongs(t.singer.mid)}))}},{key:"normalizeData",value:function(t){return t.map((function(t){return Object(h["a"])(t)}))}},{key:"_getSingerSongs",value:function(t){var e=this;Object(f["b"])(t).then((function(t){var n=t.data,a=t.code;a===g["a"]&&e._getSongUrl(n.songList).then((function(t){e.songs=e.normalizeData(t)}))}))}},{key:"_getSongUrl",value:function(t){return Object(b["b"])(t)}}]),n}(u["d"]);Object(l["a"])([Object(v["b"])("singer")],y.prototype,"singer",void 0),y=Object(l["a"])([Object(u["a"])({components:{MusicList:p["a"],Player:d["a"]}})],y);var m=y,j=m,O=(n("0f81"),n("2877")),k=Object(O["a"])(j,a,s,!1,null,"a5f1982c",null);e["default"]=k.exports},fa9d:function(t,e,n){"use strict";function a(t){for(var e="abcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(7*Math.random()+10),a="zza",s=0;s<n;s++)a+=e[Math.floor(36*Math.random())];return a+window.__sign_hash_20200305("CJBPACrRuNy7"+JSON.stringify(t))}n.d(e,"a",(function(){return a}))}}]);
//# sourceMappingURL=chunk-67f9128a.6bcaab37.js.map