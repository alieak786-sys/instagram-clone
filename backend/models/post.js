const mongoose=require('mongoose')
const posts=mongoose.Schema({
 author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    require:true
 },
 mediatype:{
    type:String,
    enum:['image','video'],
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
  saved: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'posts'
        }
    ],
  comments:[{
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    },
    message:String
 }]
 
    
})
module.exports=mongoose.model('posts',posts)