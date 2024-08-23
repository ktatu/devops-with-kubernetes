const express = require("express")
const app = express()
const config = require("./config")
const database = require("./database")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
    res.sendStatus(200)
})

app.get("/todos", async (_req, res) => {
    const todosFromDb = await database.getTodos()
    res.json(todosFromDb)
})

app.post("/todos", (req, res) => {
    try {
        const newTodo = req.body.todo
        console.log("post request /todos body: ", req.body)
        if (newTodo.length > 140) {
            throw new Error("Max todo length: 140")
        }
        database.addTodo(newTodo)
        return res.sendStatus(200)
    } catch (error) {
        if (error.message === "Max todo length: 140") {
            console.error(error.message)
            return res.status(400).json({ error: error.message })
        }
        return res.sendStatus(500)
    }
})

app.listen(config.PORT, async () => {
    console.log(`Todo-backend listening on port ${config.PORT}`)
    await database.connect()
})
