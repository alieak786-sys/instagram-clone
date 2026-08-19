const uploadcloudinary = require('../config/cloudinary')
const usermodel = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendOtpEmail = require("../config/mail")
const posts = require('../models/post')
const story = require('../models/story')
const reels = require('../models/reels')
const messages = require('../models/message')
const conversations = require('../models/conversation')
const { getSocketIo } = require('../socket')
const { io } = require("../socket")
const gentoken = async (id) => {
    const token = await jwt.sign({ id }, process.env.SECRET, { expiresIn: '10y' })
    return token
}


const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const exist = await usermodel.findOne({ email, username })
        if (!exist) {
            const salt = await bcrypt.genSalt(10)
            const hashedpass = await bcrypt.hash(password, salt)
            if (password < 8) {
                return res.status(200).json({ message: "password should be strong" })

            }
            const user = await usermodel.create({
                name, username,
                email,
                password: hashedpass,
            })
            const token = await gentoken(user._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 10 * 360 * 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: "Lax"
            })
            return res.status(200).json({
                message: user, username: user.username,
                name: user.name, token
            })
        }
        else {
            return res.status(200).json({ message: "user already exists" })
        }

    } catch (err) {
        console.log(err.message);

    }
}


const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await usermodel.findOne({ email })
        if (exist) {

            const comparepass = await bcrypt.compare(password, exist.password)
            if (!comparepass) {
                return res.status(200).json({ message: "incorrect password" })

            }
            if (password < 8) {
                return res.status(200).json({ message: "password should be strong" })

            }
            const token = await gentoken(exist._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 10 * 360 * 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: "Lax"
            })
            return res.status(200).json({
                message: "signin successfully",
                username: exist.username, name: exist.name, success: true, token
            })
        }
        else {
            return res.status(200).json({ message: "user not  exists" })
        }

    } catch (err) {
        console.log(err.message);

    }
}


const signout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: "cookie removed successfully " })

}

const getuser = async (req, res) => {
  const  userid = req.userid
    const founduser = await usermodel.findById(userid).populate("posts reels saved saved.author following follower")
    if (!founduser) {
        return res.json({ message: "user not found" })
    }
    return res.json(founduser)

}


const getsuggestedusers = async (req, res) => {
    const user = await usermodel.find({ _id: { $ne: req.userid } }).select("-password")
    return res.json(user)

}


const forgetPasswordStep1 = async (req, res) => {
    try {
        const { email } = req.body
        const user = await usermodel.findOne({ email })
        if (!user) return res.status(200).json({ message: "user not found" })

        const otp = Math.floor(100000 + Math.random() * 900000) // 6-digit otp
        user.otp = otp
        user.otpExpiry = Date.now() + 10 * 60 * 1000
        await user.save()

        await sendOtpEmail(email, otp)
        return res.status(200).json({ message: "otp sent" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "server error" })
    }
}


const verifyotp = async (req, res) => {
    const { email, otp } = req.body
    const user = await usermodel.findOne({ email })
    if (!user || user.otp !== Number(otp) || user.expireotp < Date.now()) {
        return res.json({ message: 'invalid/expire OTP' })
    }
    user.confirmotp = true
    user.otp = undefined
    user.otpExpiry - undefined
    await user.save()
    res.json({ message: 'sent OTP' })

}


const resetpass = async (req, res) => {
    const { email, password } = req.body
    const user = await usermodel.findOne({ email })
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)
    if (!user || !user.confirmotp) {
        res.json({ message: 'OTP verification required' })
    }

    user.password = hashedpass
    user.confirmotp = false
    await user.save()
    res.json({ message: "password reset successfully" })


}


const editprofile = async (req, res) => {
    const { name, username, bio, profession, gender } = req.body
    const exist = await usermodel.findById(req.userid).select('-password')
    if (!exist) {
        return res.json({ message: "user not  found" })

    }
    const sameuser = await usermodel.findOne({ username }).select('-password')
    if (sameuser && sameuser._id.toString() !== req.userid) {

        return res.json({ message: "user already exists " })

    }
    let profile;
    if (req.file) {
        profile = await uploadcloudinary(req.file.path)
    }
    const updateuserinfo = await usermodel.findByIdAndUpdate(req.userid,
        {
            name,
            username,
            profile,
            profession,
            bio,
            gender

        }
    ).select('-password')

    return res.json({ message: updateuserinfo })

}


const getprofile = async (req, res) => {
    const username = req.params.username;
    const exists = await usermodel.findOne({ username }).select('-password')
    if (!exists) {
        return res.json({ message: "user not  found" })

    }
    return res.json(exists)

}


const uploadpost = async (req, res) => {
    const { caption, mediatype } = req.body
    let media
    if (req.file) {
        media = await uploadcloudinary(req.file.path)
    }
    else {
        return res.json({ message: "media not  found" })

    }
    const posting = await posts.create({
        caption, media, mediatype, author: req.userid
    })
    const user = await usermodel.findById(req.userid)
    user.posts.push(user._id)
    await user.save()
    const populating = await posts.findById(posting._id).populate('author', 'username name profile')
    return res.status(200).json(populating)
}



const getallposts = async (req, res) => {
    const find = await posts.find({}).populate('author', 'username name profile').populate('comments.author', 'username name profile').sort({ _id: -1 })
    return res.status(200).json(find)

}


const like = async (req, res) => {
    const postid = req.params.postid
    const post = await posts.findById(postid)
    if (!post) {
        return res.status(200).json({ message: "post not found" })
    }
    const alreadylike = post.likes.some(id => id.toString() == req.userid.toString())
    if (alreadylike) {
        post.likes = post.likes.filter(id => id.toString() !== req.userid.toString())
    }
    else {
        post.likes.push(req.userid)
    }
    await post.save()
    await post.populate('author', 'username name profile')
    io.emit("likedPost", {
        postid: post._id,
        likes: post.likes
    })
    return res.status(200).json(post)


}


const comments = async (req, res) => {
    const { message } = req.body
    const postid = req.params.postid
    const post = await posts.findById(postid)
    if (!post) {
        return res.status(200).json({ message: "post not found" })
    }
    post.comments.push({
        author: req.userid,
        message
    })
    await post.save()
    await post.populate('author', 'username name profile')
    await post.populate('comments.author')
    io.emit("commentPost", {
        postid: post._id,
        comments: post.comments
    })
    return res.status(200).json(post)

}


const saved = async (req, res) => {
    const postid = req.params.postid
    const user = await usermodel.findById(req.userid)

    const alreadysaved = user.saved.some(id => id.toString() == postid.toString())
    if (alreadysaved) {
        user.saved = user.saved.filter(id => id.toString() !== postid.toString())
    }
    else {
        user.saved.push(postid)
    }
    await user.save()
    const updateduser = await usermodel.findById(req.userid).select('-password')

    return res.status(200).json(updateduser)


}


const uploadreel = async (req, res) => {
    const { caption } = req.body
    let media
    if (req.file) {
        media = await uploadcloudinary(req.file.path)
    }
    else {
        return res.json({ message: "media not  found" })

    }
    const reel = await reels.create({
        caption, media, author: req.userid
    })
    const user = await usermodel.findById(req.userid)
    user.reels.push(reel._id)
    const populating = await reels.findById(reel._id).populate('author', 'username name profile')
    return res.status(200).json(populating)
}


const reelslike = async (req, res) => {
    const reelsid = req.params.reelsid
    const reel = await reels.findById(reelsid)
    if (!reel) {
        return res.status(200).json({ message: "post not found" })
    }
    const alreadylike = reel.likes.some(id => id.toString() == req.userid.toString())
    if (alreadylike) {
        reel.likes = reel.likes.filter(id => id.toString() !== req.userid.toString())
    }
    else {
        reel.likes.push(req.userid)
    }
    await reel.save()
    await reel.populate('author', 'username name profile')
    io.emit("likedreel", {
        reelsid: reel._id,
        likes: reel.likes
    })
    return res.status(200).json(reel)


}


const reelscomments = async (req, res) => {
    const { message } = req.body
    const reelsid = req.params.reelsid
    const reel = await reels.findById(reelsid)
    if (!reel) {
        return res.status(200).json({ message: "post not found" })
    }
    reel.comments.push({
        author: req.userid,
        message
    })
    await reel.save()
    await reel.populate('author', 'username name profile')
    await reel.populate('comments.author')
    io.emit("commentreel", {
        reelsid: reel._id,
        comments: reel.comments
    })
    return res.status(200).json(reel)


}


const getallreels = async (req, res) => {
    const find = await reels.find({}).populate('author', 'username name profile').populate("comments.author")
    return res.status(200).json(find)

}

const stories = async (req, res) => {
    const user = await usermodel.findById(req.userid)
    if (user.story) {
        await story.findByIdAndDelete(user.story)
        user.story = ""
    }
    const { mediatype } = req.body
    let media
    if (req.file) {
        media = await uploadcloudinary(req.file.path)
    }
    else {
        return res.status(200).json({ message: "media not found" })

    }
    const uploadstory = await story.create({
        author: req.userid, mediatype, media
    })
    user.story = uploadstory._id
    await user.save()
    const populatestory = await story.findById(uploadstory._id).populate("author", "username name profile").populate("views", "name username profile")
    return res.status(200).json(populatestory)

}

const storyviewers = async (req, res) => {
    const storyid = req.params.storyid;

    const foundStory = await story.findById(storyid);

    if (!foundStory) {
        return res.json({ message: "story not found" });
    }

    const viewersid = foundStory.views.map(id => id.toString());

    if (!viewersid.includes(req.userid.toString())) {
        foundStory.views.push(req.userid);
        await foundStory.save();
    }

    const populatedstory = await story.findById(foundStory._id)
        .populate("author", "username name profile")
        .populate("views", "name username profile");

    res.json(populatedstory);
}

const getstory = async (req, res) => {
    const username = req.params.username
    console.log(req.params.username);

    const finduser = await usermodel.findOne({ username })
    console.log(finduser);

    if (!finduser) {
        return res.json({ message: "user not found" })
    }
    const stories = await story.find({ author: finduser._id }).populate("views author")
    res.json(stories)

}

const follow = async (req, res) => {
    const currentuserid = req.userid
    const targetuserid = req.params.targetuserid
    if (!targetuserid) {
        return res.status(200).json({ message: "target user not found" })

    }
    if (currentuserid == targetuserid) {
        return res.status(200).json({ message: "you canaot follow yourself" })

    }
    const currentuser = await usermodel.findById(currentuserid)
    const targetuser = await usermodel.findById(targetuserid)
    const isfollowing = currentuser.following.includes(targetuserid)
    if (isfollowing) {
        currentuser.following = currentuser.following.filter(id => id.toString() !== targetuserid)
        targetuser.follower = targetuser.follower.filter(id => id.toString() !== currentuserid)


        await currentuser.save()
        await targetuser.save()
        return res.status(200).json({ following: false, message: "unfollowed" })

    }
    else {
        currentuser.following.push(targetuserid)
        targetuser.follower.push(currentuserid)
        await currentuser.save()
        await targetuser.save()
        return res.status(200).json({ following: true, message: "followed", currentuser, targetuser })

    }
}
const getallstories = async (req, res) => {
    const currentuser = await usermodel.findById(req.userid)
    const followingid = currentuser.following
    const stories = await story.find({ author: { $in: followingid } })
        .populate("views author")
        .sort({ _id: -1 })

    const unique = []
    const seen = new Set()
    stories.forEach(s => {
        if (!seen.has(s.author._id.toString())) {
            seen.add(s.author._id.toString())
            unique.push(s)
        }
    })
    res.json(unique)
}


const sendmessages = async (req, res) => {
    const senderid = req.userid;
    const recieverid = req.params.recieverid;
    const { message } = req.body

    let image;
    if (req.file) {
        image = await uploadcloudinary(req.file.path)
    }

    const newmessage = await messages.create({
        sender: senderid,
        reciever: recieverid,
        message,
        image
    })
    const populated = await messages.findById(newmessage._id).populate('sender', '_id')


    let conversation = await conversations.findOne({
        participant: { $all: [senderid, recieverid] }
    })
    if (!conversation) {
        conversation = await conversations.create({
            participant: [senderid, recieverid],
            messages: [newmessage._id]

        })
        res.json(populated)
    }
    else {
        conversation.messages.push(newmessage._id)
        await conversation.save()
        const recieversocketid = getSocketIo(recieverid)
        if (recieversocketid) {
            io.to(recieversocketid).emit("newMessage", newmessage)

        }
        res.json(populated)
    }
}
const getmessages = async (req, res) => {
    const senderid = req.userid;
    const recieverid = req.params.recieverid;
    // const {message}=req.body
    const conversation = await conversations.findOne({
        participant: { $all: [senderid, recieverid] }
    }).populate({ path: 'messages', populate: { path: 'sender', select: '_id' } })
    res.json(conversation?.messages || [])


}
const getprevmessage = async (req, res) => {
    const currentuserid = req.userid
    const conversation = await conversations.find({
        participant: currentuserid

    }).populate("participant").sort({ _id: -1 })

    const userMap = {}
    conversation.forEach(conv => conv.participant.forEach(user => {
        if (user._id !== currentuserid.toString()) {
            userMap[user._id] = user
        }
    }))
    const previoususer = Object.values(userMap)
    return res.json(previoususer)
}

const followinglist = async (req, res) => {
    const result = await usermodel.findById(req.userid)
    return res.json(result.following)
}


const search = async (req, res) => {
    const keyword = req.query.keyword
    if (!keyword) {
        return res.json([])
    }
    const users = await usermodel.find({
        $or: [{ username: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } }]
    }).select("-password")
    return res.status(200).json(users)
}

module.exports = {
    signup, getuser, signin, signout, forgetPasswordStep1, verifyotp,
    resetpass, getsuggestedusers,
    editprofile, getprofile, uploadpost, like, comments, saved, getallposts,
    uploadreel, reelslike, reelscomments, getallreels, stories, storyviewers, getstory, follow,
    getallstories, sendmessages, getmessages, getprevmessage, followinglist, search
}
