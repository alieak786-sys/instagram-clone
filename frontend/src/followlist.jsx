import axios from 'axios'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { backendurl } from "./App"
import { setfollowData, setUserData } from "./slice"

const Getfollowlist=()=>{
    const dispatch=useDispatch()
  const  fetchdata=async()=>{
const res=await axios.get(backendurl+'/api/followlist', { withCredentials: true })
dispatch(setfollowData(res.data))

}
useEffect(()=>{
fetchdata()
},[])
}
export default Getfollowlist
