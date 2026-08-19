import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

const Story=({userData,storyData})=>{
  const {username}=useParams()
  const {allStories}=useSelector(state=>state.user)
const navigate=useNavigate()
const handlestory=()=>{
  if(!storyData?.length&&userData?.username&&"Your story"){
    navigate('/upload')
  } else {
    navigate(`/getstory/${userData?.username}`)
  }
}
    return(<>
    
      <div className="story-row">
        <div className="story-item">
          <div onClick={handlestory}
           className={storyData?.length?"story-avatar storyclr":"story-avatar"}>{userData?.profile?
            <img src={userData.profile} alt="" /> :<CgProfile />}
            <div className="plusshow">{!storyData?.length&&userData?.username&&"Your story"&&
              <CiCirclePlus />}</div> </div>
          <span className="story-username">{userData?.username&&"Your story"}</span>
        </div>
       
       <div>
       
<div >
       {allStories?.map((item, idx) => (
  <div key={idx} className="story-item">
    <div
      onClick={() => navigate(`/getstory/${item.author.username}`)}
      className="story-avatar storyclr"
    >
      {item.author.profile ? (
        <img src={item.author.profile} alt="" />
      ) : (
        <CgProfile />
      )}
    </div>

    <span className="story-username">
      {item.author.username}
    </span>
  </div>
))}</div>
      
       </div>
       
      </div> </>)
}
export default Story