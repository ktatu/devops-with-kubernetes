require("dotenv").config()

const PORT = process.env.PORT || 3002
const PINGS_URL = process.env.PINGS_URL
const ENV_MESSAGE = process.env.MESSAGE || ""

module.exports = { PORT, PINGS_URL, ENV_MESSAGE }
