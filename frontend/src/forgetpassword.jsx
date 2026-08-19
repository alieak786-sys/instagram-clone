import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { backendurl } from "./App"
import { MdPassword } from "react-icons/md"
const Forgetpassword=()=>{

const [pageui,setpageui]=useState(1)
const [otp,setotp]=useState('')
const [email,setemail]=useState('')
const [resetp,setresetp]=useState('')
const [respone,setresponse]=useState('')
const navigate=useNavigate()


const enteremail=async()=>{
  const res=await axios.post(`${backendurl}/api/emailotp`,{email})
  console.log(res.data.message);
  setresponse(res.data)
}

const enterotp=async()=>{
  const res=await axios.post(`${backendurl}/api/otp`,{email,otp})
  console.log(res.data.message);
setresponse(res.data)  
}
const enterreset=async()=>{
  const res=await axios.post(`${backendurl}/api/resetpassword`,{email,password:resetp})
  console.log(res.data.message);
  setresponse(res.data)
}

const handleemail=async()=>{
  await enteremail()
  setpageui(2)
}
const handleotp=async()=>{
  await enterotp()
  setpageui(3)
}

return(
<div className="fp-wrapper">
  <div className="fp-back-btn" onClick={()=>navigate('/login')}>←</div>

  <div className="fp-card">
  {/* 1 */}
  {pageui===1?<>
  <div className="fp-heading">enter email for forget password</div>
  <div className="fp-input-group">
          <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" name="email" placeholder="Enter Your email" />
           <button className="fp-btn" onClick={handleemail}>submit email</button>
        </div></>:null
        }
  {/* 2 */}
  {pageui===2?  <>
  <div className="fp-heading">enter OTP </div>
  <label htmlFor="otp" className="fp-input-group">
          <input onChange={(e)=>setotp(e.target.value)} value={otp} id="otp" type="password" name="otp" placeholder="Enter Your otp" />
        </label>
         <button onClick={handleotp} className="fp-btn">submit OTP</button></>:null}
        {/* 3 */}
  {pageui===3 ?    <>
  <div className="fp-heading">enter reset password</div>
  <div className="fp-input-group">
          <input onChange={(e)=>{setresetp(e.target.value)}} value={resetp} type="password" name="password" placeholder="Enter Your password" />
           <button onClick={enterreset} className="fp-btn">reset password</button>
        </div></>:null}
  </div>
</div>
)
}
export default Forgetpassword