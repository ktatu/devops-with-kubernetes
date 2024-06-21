const express = require("express")
const app = express()
const config = require("./config")
const fs = require("fs")

let pongCounter = 0
const pongFilePath = "/usr/src/app/files/pings/pongs.txt"

app.get("/pingpong", (req, res) => {
    res.send("pong " + pongCounter)
    pongCounter += 1
    writePongCount()
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})

const writePongCount = () => {
    fs.writeFile(pongFilePath, pongCounter.toString(), (error) => {
        if (error) {
            console.log("Error writing pong file: ", error)
        } else {
            console.log("succesfully written to pong file")
        }
    })
}
