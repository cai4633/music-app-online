const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}

const axios = require("axios")
const express = require("express")
const app = express()
const apiRoutes = express.Router()
const bodyParser = require("body-parser")
const singerlistMock = require("./src/common/mock/singerlist.ts")
// const recommendListMock = require("./src/common/mock/recommendList.ts")
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json()) // for parsing application/json
app.use("/api", apiRoutes)

module.exports = {
  chainWebpack: (config) => {
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
    before(app) {
      const url = "https://u.y.qq.com/cgi-bin/musics.fcg"
      const surl = "https://u.y.qq.com/cgi-bin/musicu.fcg"
      app.get("/api/getDescLists", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query,
          // timeout: 1000,
        })
          .then((response) => {
            res.status(200).json({ data: response.data }) // nodejs使用res.json()直接传入response变量会引起循环引用报错
          })
          .catch((e) => {
            console.log("推荐列表请求失败")
            // res.json(recommendListMock)
          })
      })
      app.get("/api/getSingerLists", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query,
          timeout: 2000,
        })
          .then((response) => {
            // res.status(200).json({ data: response["data"].singerList }) // nodejs使用res.json()直接传入response变量会引起循环引用报错
            res.json(singerlistMock)
          })
          .catch((e) => {
            console.log("歌手列表请求失败")
            res.json(singerlistMock)
            // console.log(e)
          })
      })
      app.get("/api/getSingerSongs", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query,
          // timeout: 100,
        })
          .then((response) => {
            res.json(response.data)
          })
          .catch((e) => {
            console.log("歌手歌曲列表请求失败")
            // console.log(e)
          })
      })
      app.get("/api/getSongUrl", (req, res) => {
        axios
          .get(surl, {
            params: req.query,
          })
          .then((response) => {
            res.json(response.data)
          })
          .catch((e) => {
            console.log("歌曲播放链接请求失败")
          })
      })
    },
  },
}
