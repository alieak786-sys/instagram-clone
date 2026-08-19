import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { backendurl } from "./App"
import { setfollowData, setUserData, togglefollow } from "./slice"

const Follow=({targetuserid})=>{
const {followData}=useSelector(state=>state.user)
const isfollowing=followData?.some(id => id.toString() === targetuserid?.toString())

const dispatch=useDispatch()
const handlefollow=async(targetuserid)=>{
    const res=await axios.get(`${backendurl}/api/follow/${targetuserid}`,{withCredentials:true})

    dispatch(togglefollow(targetuserid))

}

    return(<>
     <div onClick={()=>handlefollow(targetuserid)} className=" follow-btn ">{isfollowing?"following":"follow"}</div>
    </>)
}
export default Follow