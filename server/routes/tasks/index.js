const express = require('express')

const router = express.Router()

router.get('/tasks', (req, res) => {
  const tasks = req.session.tasks
  res.render('tasks', { tasks })
})

router.get('/tasks/completed', (req, res) => {
  res.render('/tasks/completed')
})

router.post('/tasks', (req, res) => {
  const task = req.body.task
  const id = +new Date()
  req.session.tasks.push({ id, task })
  res.redirect('/tasks')
})

router.delete('tasks/:id', (req,res) => {
  const id = +req.params.id
  req.session.tasks = req.session.tasks.filter( task => { 
    return task.id !== id
})
  res.send(`Sucess removing task`)
})

router.put('/tasks/:id', (req, res) => {
  const id = +req.params.id
  const { editedValue } = req.body
  req.session.tasks = req.session.tasks.map( task => {
    if (task.id === id) { task.task = editedValue }
    return task
  })
  res.send(`Success editing element ${id}!!`)
})


module.exports = router
