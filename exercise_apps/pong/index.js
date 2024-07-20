const express = require("express")
const app = express()
const config = require("./config")
const database = require("./database")

let pongCounter = 0

app.get("/pingpong", (_req, res) => {
    res.json({ pingCount: pongCounter })
    pongCounter += 1
    database.addPing(pongCounter)
})

app.listen(config.PORT, async () => {
    console.log("Server running on port " + config.PORT)
    await database.connect()
    pongCounter = await database.getPings()
})
