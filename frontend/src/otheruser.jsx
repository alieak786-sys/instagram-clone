import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Follow from "./follow";

const Otheruser = ({ user }) => {

    const navigate=useNavigate()
    return (
        <div className="suggestion-item">
            <div onClick={()=>navigate(`/profile/${user.username}`)} className="suggestions-avatar">
                {user?.profile ? <img src={ user.profile}/>: <CgProfile />}
            </div>
            <div className="suggestion-info">
                <span className="suggestion-username">{user?.username}</span>
                <span className="suggestion-name">{user?.name}</span>
                 <Follow className=" follow-btn" targetuserid={user?._id}/>

            </div>   

        </div>
    )
}
export default Otheruser 