const crypto = require("crypto")
const express = require("express")
const app = express()
const config = require("./config")
const fs = require("fs")
const axios = require("axios")

const timestampPath = "/usr/src/app/files/timestamp/timestamp.txt"
const pingPath = "/usr/src/app/files/pings/pongs.txt"

const generateRandomString = () => crypto.randomBytes(20).toString("hex")

app.get("/", async (req, res) => {
    let resString = ""

    try {
        const timestamp = fs.readFileSync(timestampPath, "utf8")
        resString += timestamp + ": " + generateRandomString()
    } catch (error) {
        console.log("Error reading hash ", error)
        resString += "Error reading hash"
    }

    resString += "<br>"

    /*
    const pings = fs.readFileSync(pingPath, "utf8")

    if (pings) {
        resString += pings
    } else {
        resString += "Error reading pings count"
    }
    */

    const pingCount = await getPings()
    const pingString = "Ping / Pongs: " + pingCount

    resString += pingString

    res.send(resString)
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})

const getPings = async () => {
    try {
        const res = await axios.get(config.PINGS_URL)
        console.log("Fetched pings")
        return res.data.pingCount
    } catch (error) {
        const errorString = `Error fetching pingcount, ${error}`
        console.log("Error fetching pings")
        return errorString
    }
}
