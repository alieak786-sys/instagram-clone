import axios from 'axios'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { backendurl } from "./App"
import { setUserData } from "./slice"

const Getcurrentuser=()=>{
    const dispatch=useDispatch()
  const  fetchdata=async()=>{
const res=await axios.post(backendurl+'/api/current',{}, { withCredentials: true })
dispatch(setUserData(res.data))

}
useEffect(()=>{
fetchdata()
},[])
}
export default Getcurrentuser
