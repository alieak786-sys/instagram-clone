import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:null,
        suggesteduser:[],
        profileData:[],
        postData:[],
        reelData:[],
        storyData:[],
        followData:[],
        allStories:[],
        selectMessage:null,
        message:[],
        socket:null,
        onlineUser:[],
        prevChat:[],
        selectedUser:[],
        search:[]
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        } ,
        
        setsuggesteduser:(state,action)=>{
state.suggesteduser=action.payload
        },
     setProfileData:(state,action)=>{
state.profileData=action.payload
        },
         setPostData:(state,action)=>{
state.postData=action.payload
        },
         setReelData:(state,action)=>{
state.reelData=action.payload
        },
         setStoryData:(state,action)=>{
state.storyData=action.payload
        },
         setfollowData:(state,action)=>{
state.followData=action.payload
            
        },
         setSelectMessage:(state,action)=>{
state.selectMessage=action.payload
            
        },
        togglefollow:(state,action)=>{
            const targetuserid=action.payload
            if(state.followData.some(id => id.toString() === targetuserid.toString())){
                state.followData=state.followData.filter(id=>id.toString()!=targetuserid.toString())
            }else{
                state.followData.push(targetuserid)
            }
        },
                 setAllStories:(state,action)=>{
state.allStories=action.payload
            
        },
          setMessage:(state,action)=>{
state.message=action.payload
        },
setSocket:(state,action)=>{
state.socket=action.payload
        },
        setOnlineUser:(state,action)=>{
state.onlineUser=action.payload
        },
        setPreChat:(state,action)=>{
state.prevChat=action.payload
        },
          setSelectedUser:(state,action)=>{
state.selectedUser=action.payload
        },
            setSearch:(state,action)=>{
state.search=action.payload
        },
    }
   
})
export const {setUserData,setSelectedUser,setOnlineUser,setPreChat,setSelectMessage,setSocket,setMessage,setsuggesteduser,setProfileData,setPostData,setReelData,setStoryData,setfollowData,togglefollow,setAllStories,setSearch}=userSlice.actions
export default userSlice.reducer