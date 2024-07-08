const express = require("express")
const app = express()
const config = require("./config")
const axios = require("axios")
const fs = require("fs")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("./public/html/main.html", { root: __dirname })
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})

setInterval(async () => {
    getImage()
}, 3600000)
// 3600000

const getImage = () => {
    const writer = fs.createWriteStream("./public/random_image/image.jpg")

    axios.get("https://picsum.photos/500", { responseType: "stream" }).then((res) => {
        return new Promise((resolve, reject) => {
            res.data.pipe(writer)
            let error = null
            writer.on("error", (err) => {
                error = err
                writer.close()
                console.log("Error: " + err)
                reject(err)
            })
            writer.on("close", () => {
                if (!error) {
                    console.log("New image downloaded")
                    resolve(true)
                }
            })
        })
    })
}

getImage()
