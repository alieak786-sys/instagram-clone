import axios from 'axios'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { backendurl } from "./App"
import { setPreChat, setUserData } from "./slice"

const GetPreChat=()=>{
    const dispatch=useDispatch()
    const {message}=useSelector(state=>state.user)
  const  fetchdata=async()=>{
const res=await axios.get(backendurl+'/api/getprevmessage', { withCredentials: true })
dispatch(setPreChat(res.data))
console.log(res.data);

}
useEffect(()=>{
fetchdata()
},[])
}
export default GetPreChat
