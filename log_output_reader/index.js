const crypto = require("crypto")
const express = require("express")
const app = express()
const config = require("./config")
const fs = require("fs")

const filePath = "/usr/src/app/files/timestamp.txt"

const generateRandomString = () => crypto.randomBytes(20).toString("hex")

app.get("/", async (req, res) => {
    await fs.readFile(filePath, (err, data) => {
        if (err) {
            res.send("Error reading hash")
        } else {
            res.send(data + ": " + generateRandomString())
        }
    })
})

app.listen(config.PORT, () => {
    console.log("Server running on port " + config.PORT)
})
