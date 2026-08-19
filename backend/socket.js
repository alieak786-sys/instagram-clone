const http=require('http')
const express=require("express")
const {Server}=require('socket.io')
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})
const userSocketMap={}
 const getSocketIo=(recieverid)=>{
    return userSocketMap[recieverid]
}
io.on("connection",(socket)=>{
    const userid=socket.handshake.query.userid
    if(userid!==undefined){
        userSocketMap[userid]=socket.id
    }
    io.emit("getOnlineUser",Object.keys(userSocketMap))


    socket.on("disconnect",()=>{
        delete userSocketMap[userid]
        io.emit("getOnlineUser",Object.keys(userSocketMap))
    })
})
module.exports={app,io,server,getSocketIo}