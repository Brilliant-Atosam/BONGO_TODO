const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/Todo')

mongoose.connect('mongodb://localhost/MERN_TODO')
                .then(console.log('DB connection established!'))
                .catch(console.error)

const app = express()
app.use(cors())
app.use(express.json())

app.post('/user', async(req, res) =>{
    console.log('Reqest has been made')
    console.log(req.body)
    setTimeout(() => {
        res.send(req.body)
        // res.status(500)
        console.log('Response has been sent')
    }, 3000);
})
app.get('/', (req, res) =>{
    res.send('Hey!')
})
app.get('/todos', async(req, res) =>{
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/todo/new', async(req, res) =>{
    const newTodo = await new Todo({
        text: req.body.text
    })
    try {
        await newTodo.save();
        res.json(newTodo)
    } catch (error) {
        res.json(error.message)
    }
})
app.delete('/todo/delete/:id', async(req, res) =>{
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo)
})
app.get('/todo/complete/:id', async(req, res) =>{
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    await todo.save()
    res.json(todo)
})
app.listen(process.env.PORT || 3001, () => console.log('Server running'))