require("dotenv").config()

const PORT = process.env.PORT || 3000
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_HOST = process.env.POSTGRES_HOST

module.exports = { PORT, POSTGRES_HOST, POSTGRES_PASSWORD }
