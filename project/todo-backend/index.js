const express = require("express")
const app = express()
const config = require("./config")

app.use(express.json())

let todos = ["Buy milk", "Work on Devops with Kubernetes"]

app.get("/todos", (req, res) => {
    res.json(todos)
})

app.post("/todos", (req, res) => {
    const newTodo = req.body.todo

    todos = todos.concat(newTodo)

    res.sendStatus(200)
})

app.listen(config.PORT, () => {
    console.log(`Todo-backend listening on port ${config.PORT}`)
})
