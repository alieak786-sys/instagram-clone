import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { backendurl } from "./App"
import { setsuggesteduser, setUserData } from "./slice"
const Getsuggestions=()=>{
    const dispatch=useDispatch()
  const  fetchdata=async()=>{
const res=await axios.post(backendurl+'/api/suggestions',{},{withCredentials: true})
console.log(res.data);
if(Array.isArray(res.data)){
dispatch(setsuggesteduser(res.data))
}
}
useEffect(()=>{
fetchdata()
},[])
}
export  default Getsuggestions
