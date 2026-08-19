const mongoose=require('mongoose')
const story=mongoose.Schema({
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
  likes:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
   
 },
  comments:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    
 },
 views: [
             {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:'user'
         }
     ],
     createdat:{
        type:Date,
       default:Date.now,
       expires:86400

     }
    
})
module.exports=mongoose.model('story',story)