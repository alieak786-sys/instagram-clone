const { app, server } = require('./socket')
const express=require('express')
const  dotenv=require('dotenv').config()
const dbconnection=require('./config/connection')
const user=require('./models/user')
const posts=require('./models/post')
const router=require('./handlers/routes')
app.use(express.json())
const cookie=require('cookie-parser')
app.use(cookie())

const cors=require('cors')

app.use(cors())

dbconnection()
const port=process.env.PORT
app.use('/api/',router)

server.listen(port,()=>{
    console.log('port is running on ',port);
    
})
