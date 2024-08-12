
const express = require('express')
const mongoose = require('mongoose')


const router = require('./Router/routeUpload')
const routerSearch = require('./Router/routeSearchData')
const routeAggregate = require('./Router/routeAggregate')

const app = express()

app.use('/api', router)
app.use('/api',routerSearch)
app.use('/api',routeAggregate)



mongoose.connect('mongodb://localhost:27017/insuremine_db')

const db = mongoose.connection

db.on('error',(error)=>{
    console.log(error,'Connection error')
})

db.once('open',()=>{
    console.log('Connected to MongoDB')
})

app.listen(4400,()=>{
    console.log('Server is running on port 4400')
})
