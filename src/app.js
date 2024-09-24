const express = require("express")
const app = express()
const usersRoutes = require('../routes/users')
const fruitsRoutes = require('../routes/fruits')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/users', usersRoutes)
app.use("/fruits", fruitsRoutes)

module.exports = app;