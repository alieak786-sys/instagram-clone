import Sidebar from './sidebar.jsx'
import './home.css'

import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { PiPlusBold } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Nav from './nav.jsx';
import Getposts from './getposts.jsx';
import Story from './storycard.jsx';
import Online from './online.jsx';
import { setSelectedUser,setSelectMessage } from './slice.jsx';
const Msg=()=>{
     const navigate=useNavigate()
  const dispatch=useDispatch()
  const {userData,storyData,onlineUser,prevChat}=useSelector(state=>state.user)
  console.log(onlineUser);
  console.log(userData.following);
  
return(<>
 <div className="messages-bar">
    <div className="messages-bar-title">Messages</div>
    <div>{userData?.following?.map((user,idx)=>(
      (onlineUser?.includes(user?._id?.toString()))&&<Online key={user._id} user={user}/>
    ))}          </div>

   {!onlineUser && <div className="messages-bar-empty">No messages yet</div>}
   <div>
    {prevChat?.map((pre,idx)=>(
   <div  key={pre._id} className="prechat-item" onClick={()=>{
    dispatch(setSelectMessage(pre))
    navigate(`/message/${pre?._id}`)
   }}>{onlineUser.includes(pre._id)?<Online user={pre}/>:
    <div> 
       <div className="prechat-avatar">
                {pre?.profile ? <img src={pre.profile}/>:<CgProfile />} 
                </div>
                 <div className="prechat-info">
                <span className="prechat-username">{pre?.username}</span>
                <span className="prechat-name">{pre?.name}</span></div>
                </div>
                }</div>   
    ))}</div> 
  </div>
    </>
)
}
export default Msg