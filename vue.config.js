const path = require("path")
function resolve(dir) {
    return path.join(__dirname, dir)
}

const axios = require("axios")
const express = require("express")
let app = express()
let apiRoutes = express.Router()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json()) // for parsing application/json
app.use("/api", apiRoutes)

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("base", resolve("baseConfig"))
            .set("public", resolve("public"))
    },
    devServer: {
        before(app) {
            app.get("/api/getDescLists", function(req, res) {
                axios({
                    url:
                        "https://u.y.qq.com/cgi-bin/musics.fcg",
                    method: "get",
                    params: req.query,
                })
                    .then((response) => {
                        res.status(200).json({ data: response.data }) // nodejs使用res.json()直接传入response变量会引起循环引用报错
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
        },
    },
}
