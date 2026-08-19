
import { useDispatch, useSelector } from "react-redux"
import { setSelectMessage } from "./slice"
import { useNavigate } from "react-router-dom"

const Online=({user})=>{
    const {selectMessage}=useSelector(state=>state.user)
    const navigate=useNavigate()
const dispatch=useDispatch()

    return(<>
   <div className="online-user" onClick={()=>{
  dispatch(setSelectMessage(user))
  navigate(`/message/${user?._id}`)
}}>
  <div className="online-avatar-wrapper">
    <img src={user?.profile} alt="" />
    <span className="online-dot"></span>
  </div>
  <span className="online-username">{user?.username}</span>
</div>
    </>)
}
export default Online