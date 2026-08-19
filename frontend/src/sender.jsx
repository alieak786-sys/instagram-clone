import { useEffect, useRef } from "react"

const Sender=({message})=>{
    
    const scroll=useRef()
    useEffect(()=>{
        scroll.current.scrollIntoView({behavior:"smooth"})
    },[message.message,message.image])
return(<>
<div ref={scroll} className="sender">
    {message.image && <img className="senderImage" src={message.image} />}
    {message.message && <div className="senderText">{message.message}</div>}
</div></>)
}
export default Sender