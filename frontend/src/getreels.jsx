import axios from 'axios'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { backendurl } from "./App"
import { setReelData } from "./slice"
import { useNavigate } from 'react-router-dom'
import Follow from './follow'
import Nav from './nav'
import { PiHeartFill } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Getreels=()=>{
    const [showcomment,setshowcomment]=useState(null)

  const [comment,setcomment]=useState("")
    const [progress,setprogress]=useState()
    const videoref=useRef([])
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {reelData,userData,socket}=useSelector(state=>state.user)
  const  fetchdata=async()=>{
const res=await axios.get(backendurl+'/api/getallreels', { withCredentials: true })
dispatch(setReelData(res.data))

}

 const  fetchlikes=async(reelsid)=>{
const res=await axios.get(`${backendurl}/api/reelslike/${reelsid}`, { withCredentials: true })
const updatereels=res.data
const allupdatedreels=reelData?.map(p=>p._id==reelsid?updatereels:p)
dispatch(setReelData(allupdatedreels))
}



const fetchcomments=async(reelsid)=>{
const res=await axios.post(`${backendurl}/api/reelscomments/${reelsid}`,{message:comment},{withCredentials:true})
const updatedcomments=res.data
const allupdatedcomments=reelData?.map(p=>p._id==reelsid?updatedcomments:p)
dispatch(setReelData(allupdatedcomments))
setcomment("")
if(!comment.trim())return;
}


useEffect(()=>{
    const observer=new IntersectionObserver((entries)=>{
        entries.forEach((entry) => {
            
      
        const video=entry.target
        if(entry.isIntersecting){
            video.play()
        }else{
            video.pause()
        }
      })
    },{threshold:0.6})
    videoref.current.forEach(video=>{
    if(video){
        observer.observe(video)
    }})
    return ()=>{
        videoref.current.forEach(video=>{
          if(video){
        observer.unobserve(video)
    }})
    }

},[reelData])

useEffect(()=>{

fetchdata()
},[])

const handletime=(e)=>{
    const video=e.target
    if(video){
      const percent = (video.currentTime/video.duration)*100
  setprogress(percent)
    }
}

useEffect(()=>{
socket?.on("likedreel",(updatedata)=>{
const updatelike=reelData?.map(p=>p._id==updatedata.reelsid?{...p,likes:updatedata.likes}:p)
dispatch(setReelData(updatelike))
})
socket?.on("commentreel",(updatedata)=>{
const updatecomment=reelData?.map(p=>p._id==updatedata.reelsid?{...p,comments:updatedata.comments}:p)
 dispatch(setReelData(updatecomment))})
 return ()=>{
  socket?.off("likedreel")
  socket?.off("commentreel")
 }
},[socket,reelData,dispatch])


return(<>
<div className="reels-wrapper">
  <div className="upload-header">  
     

    <svg onClick={()=>navigate('/')} className="upload-back" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <h2 className="reels-title">Reels</h2>
  </div>
  <Nav/>
  <div>
    {reelData?.map((item,idx)=>(
      <div className="reel-item" key={idx}>
        <div>
          <video ref={e1=>videoref.current[idx]=e1} onTimeUpdate={handletime}
           className="reel-video" autoPlay muted loop  src={item?.media}
            onClick={(e)=>e.target.paused?e.target.play():e.target.pause()}></video>



<div className="reel-actions">
  <div className="reel-action-btn" onClick={()=>fetchlikes(item._id)}>
    {!item?.likes?.some(id=>id.toString()===userData?._id?.toString())
      ? <PiHeart className="action-icon" />
      : <PiHeartFill className="action-icon liked-icon" />}
    <span className="action-count">{item?.likes?.length}</span>
  </div>

  <div onClick={()=>setshowcomment(showcomment===item._id?null:item._id)} className="reel-action-btn">
    <FaRegComment className="action-icon" />
    <span className="action-count">{item?.comments?.length}</span>
  </div>
</div>


<div>
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
    }</div>




          <div className="reel-info">
            
            
            <img className="reel-avatar" src={item?.author?.profile} alt="" />
            <div className="reel-username">{item?.author?.username}</div>
               <div className="reel-caption">{item?.caption}</div> 
           <Follow targetuserid={item?.author?._id}/>

             <div  className="progress-bar">
            <div style={{width:`${progress}%`}} className='progress'></div></div>
          </div>
        </div>
      </div>
    ))}        
  </div>
 
</div></>)}
export default Getreels
