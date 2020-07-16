const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}

const axios = require("axios")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const apiRoutes = express.Router()
const singerlistMock = require("./src/common/mock/singerlist.ts")
const recommendListMock = require("./src/common/mock/recommendList.ts")
app.use(bodyParser.json()) // for parsing application/json
app.use("/api", apiRoutes)

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",             //打包路径：'/'适用于服务器端，'./'适用于本地或者GitPage
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("api", resolve("src/api"))
      .set("common", resolve("src/common"))
      .set("base", resolve("src/base"))
      .set("public", resolve("public"))
  },
  devServer: {
    //axios + proxy + interceptors 实现跨域拦截mock功能，偏前端
    proxy: {
      "/cgi-bin": {
        //推荐歌单 + 获取歌曲播放链接 + getSingerSongs(获取歌手的歌曲) + getSingerList
        target: "https://u.y.qq.com",
        changeOrigin: true
      },
      "/qzone": {
        //歌单详情
        target: "https://c.y.qq.com",
        changeOrigin: true,
        headers: { referer: "https://y.qq.com/" }
      },
      "/soso": {
        //搜索
        target: "https://c.y.qq.com",
        changeOrigin: true,
        headers: { referer: "https://y.qq.com/" }
      },
      "/lyric": {
        //歌词
        target: "https://c.y.qq.com",
        changeOrigin: true,
        headers: { referer: "https://y.qq.com/" }
      }
    },
    before(app) {
      // app + apiRoutes + before(app) 实现跨域，拦截，mock等功能，偏后端
    }
  }
}
