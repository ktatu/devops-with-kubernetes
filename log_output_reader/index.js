const crypto = require("crypto")
const express = require("express")
const app = express()
const config = require("./config")
const fs = require("fs")

const timestampPath = "/usr/src/app/files/timestamp/timestamp.txt"
const pingPath = "/usr/src/app/files/pings/pongs.txt"

const generateRandomString = () => crypto.randomBytes(20).toString("hex")

app.get("/", async (req, res) => {
    let resString = ""

    const timestamp = fs.readFileSync(timestampPath, "utf8")

    if (timestamp) {
        resString += timestamp + ": " + generateRandomString()
    } else {
        resString += "Error reading hash"
    }

    resString += "<br>"

    const pings = fs.readFileSync(pingPath, "utf8")

    if (pings) {
        resString += pings
    } else {
        resString += "Error reading pings count"
    }

    res.send(resString)
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})
