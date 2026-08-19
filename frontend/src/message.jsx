import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { backendurl } from "./App";
import { setMessage } from "./slice";
import Sender from "./sender";
import Reciever from "./reciever";

const Message = () => {
    const ref=useRef()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [input,setinput]=useState("")
    const [backend,setbackend]=useState("")
    const [frontend,setfrontend]=useState("")
const {selectMessage,message,userData,socket}=useSelector(state=>state.user)
const {recieverid}=useParams()
const handlemessage=async()=>{
   console.log("selectMessage before sending:", selectMessage)
     if (!selectMessage?._id) {
        console.warn("No conversation selected, aborting send");
        return;
    }
    const formdata=new FormData()
    formdata.append("message",input)
    formdata.append("image",backend)
    const res=await axios.post(`${backendurl}/api/sendmessages/${recieverid}`,formdata,{withCredentials:true})
    dispatch(setMessage([...message,res.data]))
    console.log(res.data);
     setinput("");
    setbackend("");
    setfrontend("");
    
}
const handleallmessage=async()=>{
   
    const res=await axios.get(`${backendurl}/api/getmessages/${recieverid}`,{withCredentials:true})
    dispatch(setMessage(res.data))
    console.log(res.data);
   setinput("") 
}
const handleimg=async(e)=>{
    const file=e.target.files[0]
    setbackend(file)
    setfrontend(URL.createObjectURL(file))

}
useEffect(() => {
    if (recieverid) {
        handleallmessage();
    }
}, [recieverid]);


useEffect(()=>{
  socket?.on("newMessage",(mess)=>{
    dispatch(setMessage([...message,mess]))
  })
 return ()=> socket?.off("newMessage")

},[message,setMessage]) 
  return (
    <div className="messagePage">
      <div className="messageHeader">
        <div onClick={()=>navigate('/')} className="backArrow">←</div>

        <div className="messageProfile">
          <img
            src={selectMessage?.profile}
            alt=""
          />

          <div>
            <h4>{selectMessage?.username}</h4>
            <p> {selectMessage?.name}</p>
          </div>
        </div>
      </div>

      <div className="messageBody">
     {message&&message.map((mess,idx)=>(
        <div key={idx}>
{mess?.sender?._id?.toString()==userData?._id?.toString()?<Sender message={mess}/>:<Reciever message={mess}/>}</div>
        ))}

      </div>


 <div className="messageFooter">
  {frontend && (
    <div className="selectedImage">
      <img src={frontend} alt="" />
    </div>
  )}

  <div className="messageInput">
    <input
      type="text"
      value={input}
      onChange={(e)=>setinput(e.target.value)}
      placeholder="Message"
    />

    <div className="messageIcons">
      <span>
        <input
          onChange={handleimg}
          type="file"
          className="hidefile"
          ref={ref}
        />
        <FaImage onClick={()=>ref.current.click()} />
      </span>

      {(input || frontend) && <button onClick={handlemessage}>➤</button>}
    </div>
  </div>

</div>
</div>
   
  );
};

export default Message;