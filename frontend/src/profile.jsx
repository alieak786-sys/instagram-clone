import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { backendurl } from "./App"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setProfileData, setSelectMessage, setUserData } from "./slice"
import { IoMdPerson } from "react-icons/io";
import { CgProfile } from "react-icons/cg"
import Nav from "./nav"
import Follow from "./follow.jsx"
import Getposts from "./getposts.jsx"
const Profile = () => {
  const [posttype, setposttype] = useState("post")
  const { profileData, userData, postData,selectMessage } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username } = useParams()

  const handleprofile = async () => {
    const res = await axios.post(`${backendurl}/api/getprofile/${username}`, {}, { withCredentials: true })

    dispatch(setProfileData(res.data))
  }
  useEffect(() => {
    handleprofile()
  }, [username, dispatch])


  const logout = async () => {
    const res = await axios.post(backendurl + '/api/signout')
    console.log(res.data)
    dispatch(setUserData(null))

  }

  return (<>
    <div className="profile-page">
      <div className="profile-topbar">
        <span onClick={() => navigate('/')} className="back-btn">←</span>
        <h3>{profileData?.username}</h3>
        <button onClick={logout} className="logout-btn">Log Out</button>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            {profileData?.profile ? <img src={profileData.profile} alt="" /> : <IoMdPerson />}
          </div>

          <div className="profile-info">
            <h2>{profileData?.name}</h2>
            <p>{profileData?.bio || ""}</p>
            <p>{profileData?.profession || "new user"}</p>
            <p>{profileData?.gender || ""}</p>

          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <h2>{profileData?.posts?.length}</h2>
            <p>Posts</p>
          </div>
          <div className="stat-box">
            <div className="follow-row">
              <div className="users-icon-group">
                <div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div>
                <div className="small-user"><div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div></div>
                <div className="small-user">      <div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div>
                </div>
              </div>
              <span className="count">{profileData?.follower?.length}</span>
            </div>
            <p>Followers</p>
          </div>

          <div className="stat-box">
            <div className="follow-row">
              <div className="users-icon-group">
                <div className="small-user">      <div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div>
                </div>
                <div className="small-user">      <div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div>
                </div>
                <div className="small-user">      <div className="small-user">{userData?.profile ? <img src={userData.profile} alt="" /> : <CgProfile />}</div>
                </div>
              </div>
              <span className="count">{profileData?.following?.length}</span>
            </div>
            <p>Following</p>
          </div>
          <div>
          </div>
          <div className="profile-actions">
            {profileData?._id === userData?._id && (
              <div onClick={() => navigate(`/edit/${userData.username}`)} className="edit-btn">Edit Profile</div>
            )}
          </div>

          <div className="profile-actions">
            {profileData?._id !== userData?._id && (
              <div className="other-actions">
                <Follow targetuserid={profileData?._id} onfollowchange={handleprofile} />
                <div className="message-btn" onClick={()=>{dispatch(setSelectMessage(profileData)),navigate(`/message/${profileData?._id}`)}}>Message</div>
              </div>
            )}
          </div>
        </div>

      </div>

      <span onClick={() => setposttype("post")}>posts</span>
      {profileData?._id == userData?._id ? <span onClick={() => setposttype("saved")}>saved</span> : ""
      }


      <div className="profile-posts-grid">
        {posttype === "post" && postData?.map((e, id) => (
          e?.author?._id === profileData?._id && <Getposts post={e} />


        ))}</div>
      <div className="profile-posts-grid">
        {posttype === "saved" && postData?.map((e, id) => (
          userData?.saved?.includes(e._id) && <Getposts post={e} />


        ))}</div>
      <Nav />

    </div>    </>)
}
export default Profile 