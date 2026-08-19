const mongoose=require('mongoose')
const message=mongoose.Schema({
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   
 },
  
 reciever:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   
 },
 message:{
    type:String
 },
 image:{
    type:String
 },
})
module.exports=mongoose.model('message',message)