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

const getTodos = async () => {
    try {
        const queryText = "SELECT * FROM todos;"
        const res = await client.query(queryText)
        return res.rows.map((dbObj) => dbObj.todo)
    } catch (error) {
        console.log("Error getting todos ", error)
        return []
    }
}

const addTodo = async (todo) => {
    const queryText = `INSERT INTO todos (todo) VALUES ('${todo}');`
    try {
        await client.query(queryText)
    } catch (err) {
        console.log("Error adding a todo ", err)
    }
}

module.exports = { connect, getTodos, addTodo }
