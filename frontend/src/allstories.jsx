import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { backendurl } from "./App"
import { setsuggesteduser,setAllStories, setUserData } from "./slice"
const GetAllStories=()=>{
    const dispatch=useDispatch()
  const  fetchdata=async()=>{
const res=await axios.get(backendurl+'/api/getallstories',{withCredentials: true})
dispatch(setAllStories(res.data))

}
useEffect(()=>{
fetchdata()
},[])
}
export  default GetAllStories
