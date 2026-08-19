import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { backendurl } from "./App"
import { useDispatch, useSelector } from "react-redux"
import { setPostData, setReelData, setStoryData ,setUserData} from "./slice"
import Nav from "./nav"
const Upload=()=>{
  const dispatch=useDispatch()
  const {postData}=useSelector(state=>state.user)
    const {reelData}=useSelector(state=>state.user)
      const {storyData}=useSelector(state=>state.user)
    const [selectupload,setselectupload]=useState('post')
    const [mediatype,setmediatype]=useState("")
    const [frontend,setfrontend]=useState(null)
    const [backend,setbackend]=useState(null)
    const [upload,setload]=useState("")
    const [caption,setcaption]=useState("")
    const ref=useRef()
    const navigate=useNavigate()
    const handleupload=(e)=>{
const file=e.target.files[0]
if (!file) return 
if(file.type.includes("image")){
setmediatype("image")
}
else{
    setmediatype("video")
}
setbackend(file)
setfrontend(URL.createObjectURL(file))
console.log(file.type);
    }
  const onuploadposts=async()=>{
const formdata=new FormData()
formdata.append("caption",caption)
formdata.append("mediatype",mediatype)
formdata.append("media",backend)
const res=await axios.post(`${backendurl}/api/upload`,formdata)
console.log(res.data);
dispatch(setPostData([...postData,res.data]))
navigate('/')


  }


    const onuploadstory=async()=>{
const formdata=new FormData()
formdata.append("mediatype",mediatype)
formdata.append("media",backend)
const res=await axios.post(`${backendurl}/api/stories`,formdata)
console.log(res.data);
dispatch(
  setStoryData([
    ...(Array.isArray(storyData) ? storyData : []),
    res.data,
  ])
);navigate('/')
  }


    const onuploadreel=async()=>{
const formdata=new FormData()
formdata.append("caption",caption)
formdata.append("mediatype",mediatype)
formdata.append("media",backend)
const res=await axios.post(`${backendurl}/api/uploadreel`,formdata)
console.log(res.data);

dispatch(setReelData([...reelData,res.data]))
navigate('/')

  }
  



  const onuploads=()=>{
    if(selectupload==="post"){
onuploadposts()
    }
    else if(selectupload==="story"){
      onuploadstory()
    }
    else if(selectupload==="reels"){
      onuploadreel()
    }
  }

    return(<>
    <div className="upload-wrapper">
  <div  className="upload-header">
    <svg onClick={()=>navigate('/')} className="upload-back" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <h1  className="upload-title">Upload Media</h1>
  </div>

  <div className="upload-tabs">
    <span onClick={()=>setselectupload("post")}  className={selectupload==="post" ? "tab active" : "tab"}>Post</span>
    <span onClick={()=>setselectupload("story")} className={selectupload==="story"?"tab active":"tab"}>Story</span>
    <span onClick={()=>setselectupload("reels")} className={selectupload==="reels"?"tab active":"tab"}>Reels</span>
  </div>
{!frontend &&  <div value={upload} className="upload-box" onClick={()=>ref.current.click()} >
    <input type="file" accept={selectupload==="reels"?"video/*":""} onChange={handleupload}  ref={ref} className="hide"/>
   
    <svg className="upload-icon" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
    <p className="upload-text">Upload {selectupload}</p>
    
  </div>}
 {frontend && (
  <div>
    {mediatype === "image" && selectupload !== "reels" && (
      <div className="media-preview">
        <img src={frontend} alt="" />
      </div>
    )}
  
  </div>
)}

{frontend && (
  <div>
    {mediatype === "video" && (
      <div className="media-preview">
        <video src={frontend} controls autoPlay />
      </div>
    )}
    
  </div>
)}  
{frontend && <div>
 {selectupload!=="story"&&<input onChange={(e)=>setcaption(e.target.value)} value={caption} className="caption-input" type="text" placeholder="caption" /> }
    <div onClick={onuploads} className="upload-btn">upload</div></div>}
<Nav/>

</div>
    </>)
}
export default Upload;