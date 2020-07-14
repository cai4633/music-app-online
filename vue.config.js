const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = express.Router();
const singerlistMock = require("./src/common/mock/singerlist.ts");
const recommendListMock = require("./src/common/mock/recommendList.ts");
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", apiRoutes);

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("api", resolve("src/api"))
      .set("common", resolve("src/common"))
      .set("base", resolve("src/base"))
      .set("public", resolve("public"));
  },
  devServer: {
    before(app) {
      const url = "https://u.y.qq.com/cgi-bin/musics.fcg";
      const songUrl = "https://u.y.qq.com/cgi-bin/musicu.fcg";
      const lyricUrl = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg";

      app.get("/api/getDiscLists", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query
          // timeout: 1000,
        })
          .then(response => {
            res.status(200).json({ data: response.data }); // nodejs使用res.json()直接传入response变量会引起循环引用报错
          })
          .catch(e => {
            console.log("推荐列表请求失败");
            // res.json(recommendListMock)
          });
      });
      app.get("/api/getSingerLists", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query,
          timeout: 2000
        })
          .then(response => {
            // res.status(200).json({ data: response["data"].singerList }) // nodejs使用res.json()直接传入response变量会引起循环引用报错
            res.json(singerlistMock);
          })
          .catch(e => {
            console.log("歌手列表请求失败");
            res.json(singerlistMock);
            // console.log(e)
          });
      });
      app.get("/api/getSingerSongs", function(req, res) {
        axios({
          url,
          method: "get",
          params: req.query
          // timeout: 100,
        })
          .then(response => {
            res.json(response.data);
          })
          .catch(e => {
            console.log("歌手歌曲列表请求失败");
            // console.log(e)
          });
      });
      app.get("/api/getSongUrl", (req, res) => {
        axios
          .get(songUrl, {
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(e => {
            console.log("歌曲播放链接请求失败");
          });
      });
      app.get("/api/getLyric", (req, res) => {
        axios
          .get(lyricUrl, {
            headers: { referer: "https://y.qq.com/" },
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          });
      });

      app.get("/api/getCdInfoById", (req, res) => {
        axios
          .get(
            "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
            {
              params: req.query,
              headers: {
                referer: "https://y.qq.com/"
              }
            }
          )
          .then(response => {
            res.json(response.data);
          });
      });
      app.get("/api/getSearchInfo", (req, res) => {
        axios
          .get("https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp", {
            params: req.query,
            headers: {
              referer: "https://y.qq.com/"
            }
          })
          .then(response => {
            res.json(response.data);
          });
      });
    }
  }
};
