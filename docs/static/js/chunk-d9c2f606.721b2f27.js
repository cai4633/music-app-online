(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9c2f606"],{"463c":function(t,e,n){"use strict";n("4671")},4671:function(t,e,n){},6688:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("scroll",{ref:"rank",staticClass:"rank",attrs:{data:t.lists}},[n("div",{staticClass:"rank-inner"},[n("ul",{staticClass:"content-inner"},t._l(t.lists,(function(e){return n("li",{key:e.id,on:{click:function(n){return t.selectItem(e)}}},[n("div",{staticClass:"topIcon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.picUrl,expression:"list.picUrl"}],attrs:{width:"100"},on:{load:t.imgLoad}})]),n("ul",{staticClass:"songlist"},t._l(e.songList,(function(e,s){return n("li",{key:e.songname},[n("span",[t._v(t._s(s+1))]),n("span",{staticClass:"txt"},[t._v(t._s(e.songname)+" - "+t._s(e.singername))])])})),0)])})),0),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.lists.length,expression:"!lists.length"}],staticClass:"loading-wrap"},[n("loading")],1)]),n("transition",{attrs:{name:"slide-in"}},[n("router-view")],1)],1)},a=[],i=n("d4ec"),c=n("bee2"),r=n("262e"),o=n("2caf"),l=n("9ab4"),u=n("60a3"),f=n("248e"),p=n("e9fc"),d=n("8fd3"),b=n("d89f"),v=n("4bb5"),h=n("1cb8"),g=function(t){Object(r["a"])(n,t);var e=Object(o["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.lists=[],t}return Object(c["a"])(n,[{key:"mounted",value:function(){this._getRank()}},{key:"imgLoad",value:function(){this.$refs.rank.refresh()}},{key:"selectItem",value:function(t){this.setToplist(t),this.$router.push({path:"/rank/".concat(t.id)})}},{key:"handlePlaylist",value:function(){var t=this.playlist.length?60:0;this.$refs.rank&&(this.$refs.rank.$el.style.bottom="".concat(t,"px"),this.$refs.rank.refresh())}},{key:"_getRank",value:function(){var t=this;this.$nextTick((function(){return Object(d["a"])().then((function(e){e.code===b["a"]&&(t.lists=e.data.topList)}))}))}}]),n}(Object(u["b"])(f["b"]));Object(l["a"])([Object(v["b"])("playlist")],g.prototype,"playlist",void 0),Object(l["a"])([Object(v["c"])("SET_TOPLIST")],g.prototype,"setToplist",void 0),g=Object(l["a"])([Object(u["a"])({components:{Scroll:p["a"],Loading:h["a"]}})],g);var m=g,k=m,j=(n("463c"),n("2877")),y=Object(j["a"])(k,s,a,!1,null,"7604e49e",null);e["default"]=y.exports},"8fd3":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return c}));n("d3b7");var s=n("d89f"),a=n("7776");function i(){var t="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",e=Object.assign({},s["c"],{format:"jsonp",g_tk:+new Date}),n=Object.assign({},s["d"],{name:"jsonp1"});return Object(a["a"])(t,e,n).then((function(t){return Promise.resolve(t)}))}function c(t){var e="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",n=Object.assign({},s["c"],{format:"jsonp",g_tk:+new Date,topid:t,tpl:3,page:"detail",type:"top"}),i=Object.assign({},s["d"],{name:"__jp2"});return Object(a["a"])(e,n,i).then((function(t){return Promise.resolve(t)}))}}}]);