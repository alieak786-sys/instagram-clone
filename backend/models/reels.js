const mongoose=require('mongoose')
const reels=mongoose.Schema({
 author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    require:true
 },

 media:{
    type:String,
    require:true
 },
 caption:{
    type:String
 },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   
 },],
 comments:[{
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    },
    message:String
 }],
 reels: [
             {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:'reels'
         }
     ],
    
})
module.exports=mongoose.model('reels',reels)