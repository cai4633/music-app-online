(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62922862"],{"0d6f":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"c",(function(){return c})),a.d(e,"b",(function(){return r}));a("d3b7");var n=a("7776"),s=a("d89f"),i=a("fa9d");function c(){var t=Object.assign({},s["f"],{uin:0,platform:"h5",needNewCode:1});return Object(n["a"])("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t,s["d"]).then((function(t){return Promise.resolve(t)}))}function o(){var t=Object.assign({},s["g"],s["b"],{format:"jsonp"});return Object(n["a"])("https://u.y.qq.com/cgi-bin/musics.fcg",t,s["e"]).then((function(t){return Promise.resolve(t)}))}function r(t){var e={comm:{ct:24,cv:1e4},albumSonglist:{method:"GetAlbumSongList",param:{albumMid:t,albumID:0,begin:0,num:10,order:2},module:"music.musichallAlbum.AlbumSongList"}},a=Object.assign({},s["g"],{"-":"albumSonglist8360672146275778",sign:Object(i["a"])(e),format:"jsonp",data:e}),c=Object(n["a"])("https://u.y.qq.com/cgi-bin/musics.fcg",a,{param:"callback",name:"callback4"});return c.then((function(t){return Promise.resolve(t.albumSonglist)}))}},5362:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"music-list"},[a("h1",{ref:"title"},[t._v(t._s(t.title))]),a("div",{ref:"banner",staticClass:"banner",style:"background-image:url("+t.bgImg+")"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.playbtn,expression:"playbtn"}],staticClass:"playbtn",on:{click:t.random}},[a("icon-svg",{attrs:{icon:"#el-icon-play1"}}),a("span",[t._v("随机播放全部")])],1)]),a("div",{ref:"layer",staticClass:"bg-layer"}),a("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,probeType:3},on:{scroll:t.getY}},[a("song-list",{ref:"songList",attrs:{songs:t.songs,rank:t.rank},on:{select:t.playlistInit}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-wrap"},[a("loading")],1),a("go-back",{staticClass:"icon-wrap",nativeOn:{click:function(e){return t.back(e)}}})],1)},s=[],i=a("d4ec"),c=a("bee2"),o=a("262e"),r=a("2caf"),l=a("9ab4"),u=a("60a3"),b=a("99f1"),f=a("e9fc"),d=a("1cb8"),h=a("2a35"),g=a("2785"),p=a("248e"),m=a("4bb5"),v=function(t){Object(o["a"])(a,t);var e=Object(r["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.top=0,t.playbtn=!0,t.layerTop=0,t.bgHeight=0,t}return Object(c["a"])(a,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){t.$refs.layer&&t.$refs.banner&&(t.layerTop=t.$refs.layer.offsetTop,t.bgHeight=t.$refs.banner.offsetHeight)}))}},{key:"random",value:function(){this.songs.length&&this.randomPlay(this.songs)}},{key:"playlistInit",value:function(t,e){this.selectPlay({list:this.songs,index:e})}},{key:"handlePlaylist",value:function(){var t=this.playlist.length?45:0;this.$refs.list&&(this.$refs.list.$el.style.bottom="".concat(t,"px"),this._refresh())}},{key:"getY",value:function(t){var e=10,a=this.layerTop+t,n=this.$refs.title.offsetTop+this.$refs.title.offsetHeight+e,s=this.$refs.banner.style;a>=n?(this.$refs.layer.style.transform="translateY(".concat(t,"px)"),this.playbtn=!0,s.height="".concat(this.bgHeight,"px"),s.zIndex="3",t>0&&(s.transform="scale(".concat(1+t/this.bgHeight,")"))):(this.playbtn=!1,s.height=n+"px",s.zIndex="50")}},{key:"back",value:function(){this.$router.back()}},{key:"_refresh",value:function(){this.$refs.list.refresh()}}]),a}(Object(u["b"])(p["b"]));Object(l["a"])([Object(u["c"])()],v.prototype,"songs",void 0),Object(l["a"])([Object(u["c"])()],v.prototype,"title",void 0),Object(l["a"])([Object(u["c"])()],v.prototype,"bgImg",void 0),Object(l["a"])([Object(u["c"])({default:!1})],v.prototype,"rank",void 0),Object(l["a"])([Object(m["c"])("SET_PLAYLIST")],v.prototype,"setPlaylist",void 0),Object(l["a"])([Object(m["a"])("selectPlay")],v.prototype,"selectPlay",void 0),Object(l["a"])([Object(m["a"])("clearSongList")],v.prototype,"clearSongList",void 0),Object(l["a"])([Object(m["a"])("randomPlay")],v.prototype,"randomPlay",void 0),v=Object(l["a"])([Object(u["a"])({components:{SongList:b["a"],Scroll:f["a"],Loading:d["a"],IconSvg:h["a"],GoBack:g["a"]}})],v);var y=v,j=y,O=(a("e8e9"),a("2877")),k=Object(O["a"])(j,n,s,!1,null,"3e48edd6",null);e["a"]=k.exports},a942:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"recommend-details"},[a("music-list",{attrs:{songs:t.songs,title:t.disc.name,bgImg:t.disc.photo}})],1)},s=[],i=(a("d81d"),a("d4ec")),c=a("bee2"),o=a("262e"),r=a("2caf"),l=a("9ab4"),u=a("60a3"),b=a("5362"),f=a("a201"),d=a("0d6f"),h=a("8f62"),g=a("d89f"),p=a("4bb5"),m=function(t){Object(o["a"])(a,t);var e=Object(r["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.songs=[],t}return Object(c["a"])(a,[{key:"created",value:function(){this.$route.params.mid||this.$router.push({path:"/recommend"}),this._getCdInfoById(this.$route.params.mid)}},{key:"_getCdInfoById",value:function(t){var e=this;return Object(d["b"])(t).then((function(t){if(t.code===g["a"]){var a=t.data.songList;Object(h["b"])(a).then((function(t){t&&(e.songs=t.map((function(t){return Object(f["a"])(t)})))}))}}))}}]),a}(u["d"]);Object(l["a"])([Object(p["b"])("disc")],m.prototype,"disc",void 0),m=Object(l["a"])([Object(u["a"])({components:{MusicList:b["a"]}})],m);var v=m,y=v,j=(a("d773"),a("2877")),O=Object(j["a"])(y,n,s,!1,null,"1dea674e",null);e["default"]=O.exports},b218:function(t,e,a){},d773:function(t,e,a){"use strict";a("b218")},e3c9:function(t,e,a){},e8e9:function(t,e,a){"use strict";a("e3c9")},fa9d:function(t,e,a){"use strict";function n(t){for(var e="abcdefghijklmnopqrstuvwxyz0123456789",a=Math.floor(7*Math.random()+10),n="zza",s=0;s<a;s++)n+=e[Math.floor(36*Math.random())];return n+window.__sign_hash_20200305("CJBPACrRuNy7"+JSON.stringify(t))}a.d(e,"a",(function(){return n}))}}]);