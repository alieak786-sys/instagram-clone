import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { backendurl } from "./App"
import { useDispatch, useSelector } from "react-redux"
import { setStoryData,setUserData } from "./slice"
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";

const GetStory=()=>{
    const {userData,storyData}=useSelector(state=>state.user)
    const {username}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const[progress,setprogress]=useState("")
 const fetchstory=async()=>{
    const res=await axios.get(`${backendurl}/api/getstory/${username}`,{withCredentials:true})
    dispatch(setStoryData(res.data))
    
 }
 const viewers=async()=>{
  const res=await axios.get(`${backendurl}/api/storyviewers/${storyData?.[0]?._id}`,{withCredentials:true})
 }

useEffect(()=>{
 fetchstory()
},[username])
useEffect(() => {
  if (storyData?.[0]?.author?._id) {
    viewers();
  }
}, [storyData]);
useEffect(()=>{
const interval=setInterval(() => {
    setprogress(prev=>{
        if(prev>=100){
            clearInterval(interval)
            navigate("/")
            return 100
        }
        return prev+1
    })
}, 650);
},[navigate])
    return(<>
  <div className="story-page">
  <div className="story-progress-bar">
    <div style={{width:`${progress}%`}} className="progress"></div>
  </div>

  <div className="upload-header">
    <svg onClick={()=>navigate('/')} className="upload-back" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <h2 className="reels-title">Story</h2>
  </div>

  <div className="story-header">
    <img src={storyData?.[0]?.author?.profile} alt="" />
    <span className="story-header-username">{storyData?.[0]?.author?.username}</span>
  </div>

  <div>
    {storyData?.[0]?.media && (
      <div>
        {storyData?.[0]?.mediatype === "image" && (
          <img className="story-media" src={storyData?.[0]?.media} alt="" />
        )}
      </div>
    )}

    {storyData?.[0]?.media && (
      <div>
        {storyData?.[0]?.mediatype === "video" && (
          <video className="story-media" src={storyData?.[0]?.media} controls autoPlay />
        )}
      </div>
    )} 
    
    <div className="views">
    {storyData?.[0]?.author?.username===userData?.username&&
    <div> 
       <span><FaEye /></span>
 <div> {storyData?.[0]?.views?.length}</div>
  
</div>
 } 
</div>
  </div>
 

</div>


    </>)
}
export default GetStory