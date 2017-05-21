const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
// const FileStore = require('session-file-store')(session)

const app = express()
const PORT = 8080

const tasksRoutes = require('./routes/tasks')

app.use(session({
  name: 'jm-server-session-cookie-id',
  secret: '4u6mVaJtJrrhZb2iHx2ugBof',
  saveUninitialized: true,
  resave: true
// store: new FileStore()
}))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.session.tasks = req.session.tasks || []
  next()
}) 

app.use(express.static(path.join(__dirname, '../client')))
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, '/views'));

app.locals.pretty=true;

app.use(tasksRoutes)

app.listen(PORT, () => console.log(`🤘 Listening at PORT ${PORT}...`))