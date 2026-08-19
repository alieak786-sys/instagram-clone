import { Route,Routes } from "react-router-dom"
import Login from "./login"
import Home from "./home"
import Forgetpassword from "./forgetpassword"
import { useDispatch, useSelector } from "react-redux"
import Getcurrentuser from "./getcurrentuser"
import Getsuggestions from "./suggestions"
import Profile from "./profile"
import Edit from "./editprofile"
import Upload from "./upload"
import Getposts from "./getposts"
import Getreels from "./getreels"
import { setAllStories, setOnlineUser, setSocket } from "./slice"
import GetStory from "./getstory"
import GetAllStories from "./allstories"
import Message from "./message"
import { useEffect } from "react"
import {io} from "socket.io-client"
import { useRef } from "react"
import Getfollowlist from "./followlist"
import GetPreChat from "./getprechat"
import Msg from "./msg"
import Search from "./search"
export const backendurl=import.meta.env.VITE_BACKEND_URL
const App=()=>{
    const dispatch=useDispatch()
    Getcurrentuser()
         const {userData}=useSelector(state=>state.user)

     Getsuggestions()
     Getposts()
     Getreels()
     Getfollowlist()
     GetPreChat()
GetAllStories()
const {suggesteduser,socket}=useSelector(state=>state.user)
const {postData}=useSelector(state=>state.user)
const {reelData}=useSelector(state=>state.user)
const {allStories}=useSelector(state=>state.user)

const ref=useRef()
useEffect(()=>{
if(userData){
    const socketio=io(backendurl,{
        query:{
            userid:userData._id 

        }
    })
    ref.current=socketio
    dispatch(setSocket(socketio))

socketio.on("getOnlineUser",(users)=>{
    dispatch(setOnlineUser(users));
console.log(users);

})


    return ()=>socketio.close()
}else{
    if(ref.current){
       ref.current.close()
       ref.current=null       
        dispatch(setSocket(null))
    }
}
},[userData])
    return(

    <div>
        <Routes>
            <Route path="/login" element={!userData?<Login/>:<Home/>}/>
            <Route path="/" element={userData?<Home/>:<Login/>}/>
            <Route path="/forgetpassword" element={<Forgetpassword/>}/>
            <Route path="/profile/:username" element={userData?<Profile/>:<Login/>}/>
            <Route path="/edit/:username" element={userData?<Edit/>:<Login/>}/>
            <Route path="/upload/" element={userData?<Upload/>:<Login/>}/>
            <Route path="/reels/" element={userData?<Getreels/>:<Login/>}/>
            <Route path="/getstory/:username" element={userData?<GetStory/>:<Login/>}/> 
            <Route path="/messages" element={userData?<Msg/>:<Login/>}/>
            <Route path="/message/:recieverid" element={userData?<Message/>:<Login/>}/>
            <Route path="/search/search" element={userData?<Search/>:<Login/>}/>
        </Routes>

    </div>
)
}
export default App