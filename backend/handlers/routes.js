const controller=require('./controller')
const auth=require('./middleware')
const express=require('express')
const router=express.Router()
const upload=require('../config/multer')


//registration user
router.post('/signup',controller.signup)
router.post('/signin',controller.signin)
router.post('/signout',controller.signout)


//forget password
router.post('/emailotp',controller.forgetPasswordStep1)
router.post('/otp',controller.verifyotp)
router.post('/resetpassword',controller.resetpass)


//for profiles of user 
 router.post('/current',auth,controller.getuser)
 router.post('/suggestions',auth,controller.getsuggestedusers)
  router.post('/getprofile/:username',auth,controller.getprofile)
 router.post('/updateprofile',auth,upload.single('profile'),controller.editprofile)


//posts
 router.post('/upload',auth,upload.single('media'),controller.uploadpost)
  router.get('/getallposts',auth,controller.getallposts)
  router.get('/like/:postid',auth,controller.like)
  router.post('/comments/:postid',auth,controller.comments)
  router.get('/saved/:postid',auth,controller.saved)
  router.get('/follow/:targetuserid',auth,controller.follow)
  router.get('/followlist',auth,controller.followinglist)


//reels
 router.post('/uploadreel',auth,upload.single('media'),controller.uploadreel)
  router.get('/reelslike/:reelsid',auth,controller.reelslike)
  router.post('/reelscomments/:reelsid',auth,controller.reelscomments)
  router.get('/getallreels',auth,controller.getallreels)

  
//story
  router.post('/stories',auth,upload.single('media'),controller.stories)
  router.get('/storyviewers/:storyid',auth,controller.storyviewers)
  router.get('/getstory/:username',auth,controller.getstory )
  router.get('/getallstories',auth,controller.getallstories )



  // messages 
  router.post('/sendmessages/:recieverid',auth,upload.single('image'),controller.sendmessages )
  router.get('/getmessages/:recieverid',auth,controller.getmessages)
  router.get('/getprevmessage',auth,controller.getprevmessage)
//search 
  router.get('/search/search',auth,controller.search)



module.exports=router
