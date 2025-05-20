const dotenv = require('dotenv')
const mongoose = require('mongoose');
const express = require('express')
const routerIndex = require('./routes')

dotenv.config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const hostname = process.env.HOSTNAME
const port = process.env.PORT
const database = process.env.DATABASE


const start = () => {
    console.log('Connected to database')
    app.use('/api', routerIndex)
}

mongoose.connect(database)
    .then(start)
    .catch(err => {
        console.log(err.message)
    })

app.listen(port,hostname, ()=>{
    console.log(`Server running on http://${hostname}:${port}`)
})