const express = require("express")
const app = express()
const config = require("./config")

app.get("/", (req, res) => {
    res.send("Server started in port " + config.PORT)
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})
