import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { PiPlusBold } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Nav=()=>{
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)


    return(<>
    <div className="bottom-navbar">
        <div onClick={()=>navigate(`/`)} className="nav-icon"><IoMdHome /></div>
        <div className="nav-icon" onClick={()=>navigate(`/search/search`)}><FaSearch /></div>
        <div onClick={()=>navigate(`/upload`)} className="nav-icon"><PiPlusBold />
    </div>
        <div className="nav-icon" onClick={()=>navigate("/reels")}><GoVideo /></div>
        <div  onClick={()=>navigate(`/profile/${userData.username}`)} className="nav-icon">      <div className="nav-profile-pic">{userData?.profile? <img src={userData.profile} alt="" /> :<CgProfile />}</div>
    </div>
      </div>
    </>

    )
}
export default Nav