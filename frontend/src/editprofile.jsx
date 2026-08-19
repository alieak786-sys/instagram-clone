import axios from "axios";
import { useRef, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { backendurl } from "./App";
import { setProfileData, setUserData } from "./slice";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    const imgref=useRef()
    const [frontendimg,setfrontendimg]=useState(userData.profile)
    const [backendimg,setbackendimg]=useState(null)
const [name , setname ]=useState(userData.name||"")
const [username , setusername ]=useState(userData.username||"")
const [bio , setbio ]=useState(userData.bio||"")
const [ profession, setprofession ]=useState(userData.profession||"")
const [gender , setgender ]=useState(userData.gender||"")

const saveprofile=async()=>{
    const formdate=new FormData()
    formdate.append('name',name)
    formdate.append('username',username)
    formdate.append('bio',bio)
    formdate.append('profession',profession)
    formdate.append('gender',gender)
    if(backendimg){
        formdate.append("profile",backendimg)
    }

const res=await axios.post(backendurl+'/api/updateprofile',formdate,{withCredentials:true})
dispatch(setProfileData(res.data))
dispatch(setUserData(res.data))
console.log(res.data);
navigate(`/profile/${username}`)
}
    const handleprofileimg=(e)=>{
        const file=e.target.files[0]
    setbackendimg(file)
setfrontendimg(URL.createObjectURL(file))
    
    
    }
    return (
        <div className="edit-wrapper">
            <div  className="edit-header">
                <svg className="edit-back" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <h1 onClick={()=>navigate(`/profile/${username}`)} className="edit-title">Edit Profile</h1>
            </div>

            <div className="edit-card">
                <div onClick={()=>imgref.current.click()}  className="edit-avatar">
                                    {frontendimg? <img src={frontendimg} alt="" />  :
                                    <div><IoMdPerson/></div>}
 
                    <input className="file" onChange={handleprofileimg} type="file" ref={imgref}/>

                    </div>
                <p className="edit-change-pic">Change Your <span>Profile Picture</span></p>

                <div className="edit-input-group">
                    <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className="edit-input" placeholder="Enter Your Name" />
                </div>
                <div className="edit-input-group">
                    <input onChange={(e)=>setusername(e.target.value)} value={username} type="text" className="edit-input" placeholder="Enter Your userName" />
                </div>
                <div className="edit-input-group">
                    <input onChange={(e)=>setbio(e.target.value)} value={bio} type="text" className="edit-input" placeholder="Bio" />
                </div>
                <div className="edit-input-group">
                    <input onChange={(e)=>setprofession(e.target.value)} value={profession} type="text" className="edit-input" placeholder="Profession" />
                </div>
                <div className="edit-input-group">
                    <input onChange={(e)=>setgender(e.target.value)} value={gender} type="text" className="edit-input" placeholder="Gender" />
                </div>

                <button onClick={saveprofile} className="edit-save-btn">Save Profile</button>
            </div>
        </div>
    )
}
export default Edit