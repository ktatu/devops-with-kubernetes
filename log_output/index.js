const crypto = require("crypto")
const express = require("express")
const app = express()
const config = require("./config")

const randomString = crypto.randomBytes(20).toString("hex")

const logTimeStampAndString = () => {
    console.log(new Date() + ": " + randomString)
}

app.get("/", (req, res) => {
    res.send(new Date() + ": " + randomString)
})

setInterval(() => {
    logTimeStampAndString()
}, 5000)

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})
