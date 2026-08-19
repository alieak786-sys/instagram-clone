import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { backendurl } from "./App"
import { setPostData ,setUserData,togglefollow} from "./slice"
import { CgProfile } from "react-icons/cg";
import { PiHeartFill } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import Follow from './follow'
import { useNavigate } from 'react-router-dom'



const Getposts=({post}={})=>{
  const navigate=useNavigate()
  const [showcomment,setshowcomment]=useState(null)
    const [comment,setcomment]=useState("")

    const {postData,userData,socket}=useSelector(state=>state.user)
    const dispatch=useDispatch()



  const  fetchdata=async()=>{
const res=await axios.get(backendurl+'/api/getallposts', { withCredentials: true })
 if(Array.isArray(res.data)){
    dispatch(setPostData(res.data))
  }

}



 const  fetchlikes=async(postid)=>{
const res=await axios.get(`${backendurl}/api/like/${postid}`, { withCredentials: true })
const updatepost=res.data
const allupdatedposts=postData?.map(p=>p._id==postid?updatepost:p)
dispatch(setPostData(allupdatedposts))
}



const fetchcomments=async(postid)=>{
const res=await axios.post(`${backendurl}/api/comments/${postid}`,{message:comment},{withCredentials:true})
const updatedcomments=res.data
const allupdatedcomments=postData?.map(p=>p._id==postid?updatedcomments:p)
dispatch(setPostData(allupdatedcomments))
setcomment("")
if(!comment.trim())return;
}



 const  fetchsaved=async(postid)=>{
const res=await axios.get(`${backendurl}/api/saved/${postid}`, { withCredentials: true })
 dispatch(setUserData(res.data))
}



useEffect(()=>{
fetchdata()
},[])

useEffect(()=>{
socket?.on("likedPost",(updatedata)=>{
const updatelike=postData?.map(p=>p._id==updatedata.postid?{...p,likes:updatedata.likes}:p)
dispatch(setPostData(updatelike))
})
socket?.on("commentPost",(updatedata)=>{
const updatecomment=postData?.map(p=>p._id==updatedata.postid?{...p,comments:updatedata.comments}:p)
 dispatch(setPostData(updatecomment))})
 return ()=>{
  socket?.off("likedPost")
  socket?.off("commentPost")
 }
},[socket,postData,dispatch])

return(<>
<div className="post-list">{(post ? [post] : postData)?.map((item,idx)=>(

 <div className="post-card" key={idx}>
    <div className='postdp' onClick={()=>navigate(`/profile/${item?.author?.username}`)}>{ <img src={item?.author?.profile} alt="" />  ||<CgProfile />}</div>
    <div className="post-header">{item?.author?.username}</div>
  <div className="post-follow-wrapper">
  <Follow targetuserid={item?.author?._id}/>
</div>
{item?.media && (
  <div>
    {item?.mediatype === "image" && (
      <div className="media-preview">
        <img  src={item?.media} alt="" />
      </div>
    )}
  
  </div>
)}


{item?.media && (
  <div>
    {item?.mediatype === "video" && (
      <div className="media-preview">
        
        <video src={item?.media} muted controls autoPlay />
      </div>
    )}
    
  </div>
)}  




<div className="post-actions">
  <div className="action-group" onClick={()=>fetchlikes(item._id)}>
    {!item?.likes?.some(id=>id.toString()===userData?._id?.toString())
      ? <PiHeart className="action-icon" />
      : <PiHeartFill className="action-icon liked-icon" />}
    <span className="action-count">{item?.likes?.length}</span>
  </div>



  <div onClick={()=>setshowcomment(showcomment===item._id?null:item._id)} className="action-group">
    <FaRegComment className="action-icon" />
    <span className="action-count">{item?.comments?.length}</span>
  </div>



 {showcomment === item._id &&<div className="comment-section">
     <div className="comment-list">{item?.comments?.map((e,id)=>(
<div className="comment-row" key={id}>
       <div className="comment-profile">{ <img src={e?.author?.profile} alt="" />  ||<CgProfile />}</div>

  <div className="comment-author">{e?.author?.username}</div>
  <div className="comment-message">{e?.message}</div> 

</div>

     ))}</div>





     <div className="comment-input-row">
    <input className="comment-input" value={comment} onChange={(e)=>setcomment(e.target.value)}  type="text" />
    <div className="comment-send" onClick={()=>fetchcomments(item?._id)}><IoSend /> </div></div></div>
    }






  <div className="post-save" onClick={()=>fetchsaved(item._id)}>
  {userData?.saved?.some(id => id.toString() === item._id.toString())
  ? <FaBookmark className="action-icon bookmark-icon" />
  : <CiBookmark className="action-icon" />}
  </div>
  <div>{userData?.saved?.length}</div>
</div>






    <div className="post-caption">{item.caption}</div></div>   
))}</div>
</>)
}

export default Getposts