import axios from "axios"
import { useState } from "react"
import { IoMdPerson } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { backendurl } from "./App"
import { useEffect } from "react"
import { setSearch } from "./slice"

const Search=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {search}=useSelector(state=>state.user)
    const [input,setinput]=useState("")
    const handleSearch=async()=>{
        const res=await axios.get(`${backendurl}/api/search/search?keyword=${input}`,{withCredentials:true})
   dispatch(setSearch(res.data)) 
       console.log(res.data);
}
    
    useEffect(()=>{
handleSearch()
    },[input])
    return(<>
    <div className="search-page">
         <div className="profile-topbar">
        <span onClick={() => navigate('/')} className="back-btn">←</span>
        <h3>search</h3>
      </div>
      <input className="search-input" onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder="Search" />
{input&& search?.map((e,idx)=>(
  <div className="search-result-item" key={idx}>
    <div className="search-result-avatar" onClick={()=>navigate(`/profile/${e?.username}`)}>{e?.profile?<img src={e?.profile} alt="" />:<IoMdPerson />}</div>
    <div className="search-result-username">{e?.username}</div>
  </div>  
))}
    </div>
    </>)
}
export default Search