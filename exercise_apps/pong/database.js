const { Client } = require("pg")
const config = require("./config")

const client = new Client({
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    user: "postgres",
})

const connect = async () => {
    try {
        await client.connect()
        console.log("Connected to database")
    } catch (err) {
        console.log("Error connecting to postgres ", err)
    }
}

const getPings = async () => {
    const queryText = "SELECT * FROM pings WHERE id = 1;"
    const res = await client.query(queryText)

    const pings = res.rows[0].counter || 0

    return pings
}

const addPing = async (pingValue) => {
    const queryText = `UPDATE pings SET counter = ${pingValue} WHERE id = 1;`
    await client.query(queryText)
}

module.exports = { connect, getPings, addPing }
