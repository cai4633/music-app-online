(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da707d62"],{"3f8e":function(t,e,s){"use strict";var n=s("fdec"),a=s.n(n);a.a},5362:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"music-list"},[s("h1",{ref:"title"},[t._v(t._s(t.title))]),s("div",{ref:"banner",staticClass:"banner",style:"background-image:url("+t.bgImg+")"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.playbtn,expression:"playbtn"}],staticClass:"playbtn",on:{click:t.random}},[s("icon-svg",{attrs:{icon:"#el-icon-play1"}}),s("span",[t._v("随机播放全部")])],1)]),s("div",{ref:"layer",staticClass:"bg-layer"}),s("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,probeType:3},on:{scroll:t.getY}},[s("song-list",{ref:"songList",attrs:{songs:t.songs,rank:t.rank},on:{select:t.playlistInit}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-wrap"},[s("loading")],1),s("go-back",{staticClass:"icon-wrap",nativeOn:{click:function(e){return t.back(e)}}})],1)},a=[],i=s("d4ec"),c=s("bee2"),o=s("262e"),r=s("2caf"),l=s("9ab4"),f=s("60a3"),b=s("99f1"),p=s("e9fc"),u=s("1cb8"),g=s("2a35"),h=s("2785"),d=s("248e"),v=s("4bb5"),y=function(t){Object(o["a"])(s,t);var e=Object(r["a"])(s);function s(){var t;return Object(i["a"])(this,s),t=e.apply(this,arguments),t.top=0,t.playbtn=!0,t.layerTop=0,t.bgHeight=0,t}return Object(c["a"])(s,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){t.$refs.layer&&t.$refs.banner&&(t.layerTop=t.$refs.layer.offsetTop,t.bgHeight=t.$refs.banner.offsetHeight)}))}},{key:"random",value:function(){this.songs.length&&this.randomPlay(this.songs)}},{key:"playlistInit",value:function(t,e){this.selectPlay({list:this.songs,index:e})}},{key:"handlePlaylist",value:function(){var t=this.playlist.length?45:0;this.$refs.list&&(this.$refs.list.$el.style.bottom="".concat(t,"px"),this.$refs.list.refresh())}},{key:"getY",value:function(t){var e=10,s=this.layerTop+t,n=this.$refs.title.offsetTop+this.$refs.title.offsetHeight+e,a=this.$refs.banner.style;s>=n?(this.$refs.layer.style.transform="translateY(".concat(t,"px)"),this.playbtn=!0,a.height="".concat(this.bgHeight,"px"),a.zIndex="3",t>0&&(a.transform="scale(".concat(1+t/this.bgHeight,")"))):(this.playbtn=!1,a.height=n+"px",a.zIndex="50")}},{key:"back",value:function(){this.$router.back()}},{key:"_refresh",value:function(){this.$refs.list.refresh()}}]),s}(Object(f["b"])(d["b"]));Object(l["a"])([Object(f["c"])()],y.prototype,"songs",void 0),Object(l["a"])([Object(f["c"])()],y.prototype,"title",void 0),Object(l["a"])([Object(f["c"])()],y.prototype,"bgImg",void 0),Object(l["a"])([Object(f["c"])({default:!1})],y.prototype,"rank",void 0),Object(l["a"])([Object(v["c"])("SET_PLAYLIST")],y.prototype,"setPlaylist",void 0),Object(l["a"])([Object(v["a"])("selectPlay")],y.prototype,"selectPlay",void 0),Object(l["a"])([Object(v["a"])("clearSongList")],y.prototype,"clearSongList",void 0),Object(l["a"])([Object(v["a"])("randomPlay")],y.prototype,"randomPlay",void 0),y=Object(l["a"])([Object(f["a"])({components:{SongList:b["a"],Scroll:p["a"],Loading:u["a"],IconSvg:g["a"],GoBack:h["a"]}})],y);var j=y,O=j,m=(s("3f8e"),s("2877")),k=Object(m["a"])(O,n,a,!1,null,"9d4e1c82",null);e["a"]=k.exports},"725e":function(t,e,s){},"8fd3":function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return c}));s("d3b7");var n=s("d89f"),a=s("7776");function i(){var t="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",e=Object.assign({},n["c"],{format:"jsonp",g_tk:+new Date}),s=Object.assign({},n["d"],{name:"jsonp1"});return Object(a["a"])(t,e,s).then((function(t){return Promise.resolve(t)}))}function c(t){var e="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",s=Object.assign({},n["c"],{format:"jsonp",g_tk:+new Date,topid:t,tpl:3,page:"detail",type:"top"}),i=Object.assign({},n["d"],{name:"__jp2"});return Object(a["a"])(e,s,i).then((function(t){return Promise.resolve(t)}))}},cc92:function(t,e,s){"use strict";var n=s("725e"),a=s.n(n);a.a},e027:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toplist"},[s("music-list",{attrs:{bgImg:t.toplist.picUrl,songs:t.songs,title:t.toplist.topTitle,rank:t.rank}})],1)},a=[],i=(s("d81d"),s("d4ec")),c=s("bee2"),o=s("262e"),r=s("2caf"),l=s("9ab4"),f=s("60a3"),b=s("5362"),p=s("8fd3"),u=s("d89f"),g=s("a201"),h=s("8f62"),d=s("4bb5"),v=function(t){Object(o["a"])(s,t);var e=Object(r["a"])(s);function s(){var t;return Object(i["a"])(this,s),t=e.apply(this,arguments),t.songs=[],t.rank=!0,t}return Object(c["a"])(s,[{key:"mounted",value:function(){this.toplist.id||this.$router.push({path:"/rank"}),this._getSongsByTopid(this.toplist.id)}},{key:"_getSongsByTopid",value:function(t){var e=this;return Object(p["b"])(t).then((function(t){if(t.code===u["a"]&&t.songlist){var s=t.songlist;Object(h["b"])(s).then((function(t){e.songs=t.map((function(t){return Object(g["a"])(t)}))}))}}))}}]),s}(f["d"]);Object(l["a"])([Object(d["b"])("toplist")],v.prototype,"toplist",void 0),v=Object(l["a"])([Object(f["a"])({components:{MusicList:b["a"]}})],v);var y=v,j=y,O=(s("cc92"),s("2877")),m=Object(O["a"])(j,n,a,!1,null,"d4d2a6c2",null);e["default"]=m.exports},fdec:function(t,e,s){}}]);
//# sourceMappingURL=chunk-da707d62.f18d5cb9.js.map