const crypto = require("crypto")
const express = require("express")
const app = express()
const config = require("./envVars")
const fs = require("fs")
const axios = require("axios")

const timestampPath = "/usr/src/app/files/timestamp/timestamp.txt"
const svConfigPath = "/usr/src/app/files/config/serverconfig.txt"

const generateRandomString = () => crypto.randomBytes(20).toString("hex")

app.get("/", async (req, res) => {
    let resString = ""

    try {
        const fileContent = fs.readFileSync(svConfigPath, "utf8")
        resString += `file content: ${fileContent}`
    } catch (error) {
        console.log("Error reading server config")
    }

    resString += "<br>"

    resString += `env variable: ${config.ENV_MESSAGE}`
    resString += "<br>"

    try {
        const timestamp = fs.readFileSync(timestampPath, "utf8")
        resString += timestamp + ": " + generateRandomString()
    } catch (error) {
        console.log("Error reading hash ", error)
        resString += "Error reading hash"
    }

    resString += "<br>"

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
