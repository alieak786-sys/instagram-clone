import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { SignIn, SignUp } from "@clerk/react";
import { useState } from "react";
import {  MdVisibility } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { backendurl } from "./App";
import axios from 'axios'

import { setUserData } from "./slice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate=useNavigate()
    const [visible,setvisible]=useState(false)
    const [loguser,setloguser]=useState('signup')
const [name,setname]=useState('')
const [username,setusername]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')
 const [signup,setsignup]=useState('')
 const dispatch=useDispatch()


const signupsubmit=async()=>{
const res=await axios.post(`${backendurl}/api/signup`,{name,username,email,password},{withCredentials:true})
console.log(res.data);
dispatch(setUserData(res.data))


}
const signinsubmit=async()=>{
const res=await axios.post(`${backendurl}/api/signin`,{email,password},{withCredentials:true})
console.log(res.data);
dispatch(setUserData(res.data))
if(res.data.success){
navigate('/')}
}


  return (
  <div className="signup-wrapper">
    <div className="signup-form">
      <h1>{loguser==='signup'?'Sign Up':'Sign In'} to <span className="brand">VYBE</span></h1>

    {loguser=='signup'?
   <> <div className="input-group">
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" name="name" placeholder="Enter Your Name" />
      </div>

      <div className="input-group">
        <input  onChange={(e)=>setusername(e.target.value)} value={username} type="text" name="username" placeholder="Enter Username" />
      </div></> 
      : ""
}
      <div className="input-group">
        <input  onChange={(e)=>setemail(e.target.value)} value={email} type="email" name="email" placeholder="Enter Email" />
      </div>
     <div className="input-group">
        <input  onChange={(e)=>setpassword(e.target.value)} value={password} type={visible?"text":"password"} name="password" placeholder="Enter password" />
  <div className="toggle-password" onClick={()=>setvisible(!visible)}>
     { visible==true ? <BiSolidHide />:
<MdVisibility  />}
        </div>
      </div>
      {loguser=='signup'?"":
<div className="forgot-password" onClick={()=>navigate('/forgetpassword')}>forget password</div>}
{loguser=='signup'?
      <button onClick={signupsubmit} className="submit-btn">Sign Up</button>
:
      <button  onClick={signinsubmit} className="submit-btn">Sign In</button>}
    
       { loguser==='signup'? 
        <p  className="switch-text">do not have account? <span onClick={()=>setloguser(loguser==='signup'?'Signup':'Signin')}>signin</span></p>
        :
                <p  className="switch-text">  already have account?  <span onClick={()=>setloguser(loguser==='signin'?"signin":'signup')}>signup</span></p>

        
    }

    </div>

    <div className="signup-media">
      <div className="vibe">vibe</div>
      <p className="quote">plateform not just give entertainment , but a vibe</p>
    </div>
  </div>
)
};

export default Login;