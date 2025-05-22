const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const routerIndex = require('./routes')
const { swaggerUi, swaggerSpec } = require('./swagger');


dotenv.config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const hostname = process.env.HOSTNAME
const port = process.env.PORT
const database = process.env.DATABASE


const start = () => {
    console.log('Connected to database')
    // Swagger doit être monté avant les autres routes
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', routerIndex)
}

mongoose.connect(database)
    .then(start)
    .catch(err => {
        console.log(err.message)
    })

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server running on http://localhost:${port}`)
    console.log(`Documentation Swagger: http://localhost:${port}/api-docs`)
})