const express = require("express")
const app = express()
const config = require("./config")
const database = require("./database")

app.use(express.json())

app.get("/todos", async (req, res) => {
    const todosFromDb = await database.getTodos()

    res.json(todosFromDb)
})

app.post("/todos", (req, res) => {
    const newTodo = req.body.todo
    database.addTodo(newTodo)

    res.sendStatus(200)
})

app.listen(config.PORT, async () => {
    console.log(`Todo-backend listening on port ${config.PORT}`)
    await database.connect()
})
