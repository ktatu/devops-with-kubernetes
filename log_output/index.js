const crypto = require("crypto")

const randomString = crypto.randomBytes(20).toString("hex")

const logTimeStampAndString = () => {
    console.log(new Date() + ": " + randomString)
}

setInterval(() => {
    logTimeStampAndString()
}, 5000)
