const mongoose=require('mongoose')
const conversation=mongoose.Schema({
participant:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   
 }],
  messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'message',
   
 }],
})
module.exports=mongoose.model('conversation',conversation)