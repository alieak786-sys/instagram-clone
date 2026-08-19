const mongoose=require('mongoose')
const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     username:{
        type:String,
        required:true,
        unique:true
    },
      email:{
        type:String,
        required:true,
        unique:true
    },
      password:{
        type:String,
        required:true,
      
    },
      profile:{
        type:String,
       
    },
    bio:{
      type:String
    },
     profession:{
      type:String
    },
     gender:{
      type:String,
      enum:['male','female','others']
    },
    follower: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
        }
    ],
      following: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
        }
    ],
    posts: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'posts'
        }
    ],
    saved: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'posts'
        }
    ],
     reels: [
                  {
                      type:mongoose.Schema.Types.ObjectId,
                      ref:'reels'
              }
          ],
            story: [
                  {
                      type:mongoose.Schema.Types.ObjectId,
                      ref:'story'
              }
          ],
          reset:{
        type:String
          },
          otp: { type: Number }
          ,
          expireotp:{
            type:Date
          },
          confirmotp:{
            type:Boolean,
            default:false
          }
    
})
module.exports=mongoose.model('user',user)