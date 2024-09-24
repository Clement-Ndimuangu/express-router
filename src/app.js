const express = require("express")
const app = express()
const usersRoutes = require('../routes/users')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/users', usersRoutes)

module.exports = app;