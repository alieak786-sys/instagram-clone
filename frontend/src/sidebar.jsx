import axios from 'axios'
import {backendurl} from './App'
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './slice';
import Otheruser from './otheruser';
import Home from './home';
import { IoMdPerson } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Sidebar=()=>{
  const {userData,suggesteduser}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logout=async()=>{
    const res=await axios.post(backendurl+'/api/signout')
    console.log(res.data)
dispatch(setUserData(null))

  }
 // console.log(userData);
  
return(<>
<div className="mobile-topbar">
  <h1 className="sidebar-logo">VYBE</h1>
    <div className="mobile-icons">
<IoChatbubbleOutline
     className="mobile-chat"
    onClick={() => navigate("/messages")}
/> 
  <svg className="sidebar-heart" viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-10-9.3C0.5 8.6 2 5 5.5 5c2 0 3.4 1.2 4.2 2.4C10.5 6.2 11.9 5 13.9 5 17.4 5 18.9 8.6 17.4 11.7 14.9 16.4 12 21 12 21z"/>
  </svg></div>
</div>
<div className="sidebar">
  <div className="sidebar-top">
    <h1 className="sidebar-logo">VYBE</h1>
    <div className="mobile-icons">
<IoChatbubbleOutline
     className="mobile-chat"
    onClick={() => navigate("/messages")}
/> </div>
    <svg className="sidebar-heart" viewBox="0 0 24 24">
      <path d="M12 21s-7.5-4.6-10-9.3C0.5 8.6 2 5 5.5 5c2 0 3.4 1.2 4.2 2.4C10.5 6.2 11.9 5 13.9 5 17.4 5 18.9 8.6 17.4 11.7 14.9 16.4 12 21 12 21z"/>
    </svg>
  
</div>
  <div className="sidebar-user">
    <div className="sidebar-avatar">{userData?.profile? <img src={userData.profile} alt="" /> :<CgProfile />}</div>
    <div className="sidebar-user-info">
      <span className="sidebar-username">{userData?.username}</span>
      <span className="sidebar-fullname">{userData?.name}</span>
    </div>
    <span onClick={logout} className="sidebar-logout">Log Out</span>
  </div>
  <div className="suggestions">
    <div className='suggestions-heading'>suggestions</div>
    <div>
    {/* <div className="suggesstions-avatar">{userData?.profile? <img src={userData.profile} alt="" /> :<CgProfile />}</div> */}

    </div>
    <div >
    {suggesteduser && Array.isArray(suggesteduser)&& suggesteduser.slice(0,10).map((e,idx)=>(
      <Otheruser key={idx} user={e}/>
   ) )}
   </div>
  </div>
  
</div>
</>)
}
export default Sidebar