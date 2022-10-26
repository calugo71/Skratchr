import React, { useState,useEffect } from "react";
import AccountInfo from "./accountinfo/AccountInfo";
import PostImage from "./postimage/PostImage"
import FeedPosts from "./feedposts/FeedPosts";

export default function Feed({
    user,setUser,userposts,setUserPosts,
    discoverBin,setDiscoverBin,followingPosts,setFollowingPosts})
{

    //navigation functionality
    const [actInfo, setActInfo] = useState(false)
    const [postImage, setPostImage] = useState(false)
    let logOut = (e) => {
        localStorage.clear();
        setUser({username: ""});
        setUserPosts([]);
        setDiscoverBin([]);
        setFollowingPosts([]);
    }
    let showActInfo = (e) => {
        setActInfo(prevState=>!prevState)
    }
    let showPostImage = (e) => {
        setPostImage(prevState=>!prevState)
    }
    
    return (     
        <>
            {
            !actInfo && !postImage ? 
            <>
                <div>hello from Feed</div>
                <button onClick={logOut}>X</button>
                <button onClick={showActInfo}>Account Info</button>
                <button onClick={showPostImage}>Make Post</button>
                <button>{user.username}</button>
                <div>
                    <FeedPosts user={user} userposts={userposts} setUserPosts={setUserPosts} 
                    discoverBin={discoverBin} followingPosts={followingPosts} 
                    setFollowingPosts={setFollowingPosts}/>
                </div>
            </> 
            : 
            actInfo && !postImage ? 
            <AccountInfo showActInfo={showActInfo} user={user} setUser={setUser} userposts={userposts} setUserPosts={setUserPosts}/>
            :
            !actInfo && postImage ?
            <PostImage showPostImage={showPostImage} userposts={userposts} setUserPosts={setUserPosts}/>
            :
            <div>Dude!!!!! You broke it, what the fuck?!?!?!?!?!</div>
        }  
        </>
    )
};