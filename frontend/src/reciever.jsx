const Reciever=({message})=>{
return(<>
<div>
    
<div className="receiver">
    {message?.image && (
        <img className="receiverImage" src={message.image} alt="" />
    )}
    {message?.message && (
        <div className="receiverText">{message.message}</div>
    )}
</div></div></>)
}
export default Reciever