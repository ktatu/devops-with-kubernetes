const express = require("express")
const app = express()
const config = require("./config")

let pongCounter = 0

app.get("/", (req, res) => {
    res.send("pong " + pongCounter)
    pongCounter += 1
})

app.get("/pingpong", (req, res) => {
    res.send("pong " + pongCounter)
    pongCounter += 1
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})
