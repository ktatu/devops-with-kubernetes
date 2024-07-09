const fs = require("fs")

const filePath = "/usr/src/app/files/timestamp/timestamp.txt"

setInterval(() => {
    const timestamp = new Date().toString()
    fs.writeFileSync(filePath, timestamp)
}, 5000)
