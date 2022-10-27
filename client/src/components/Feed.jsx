import React, { useState,useEffect } from "react";
import AccountInfo from "./accountinfo/AccountInfo";
import PostImage from "./postimage/PostImage"
import FeedPosts from "./feedposts/FeedPosts";
import './Feed.css';

export default function Feed({
    user,setUser,userposts,setUserPosts,
    discoverBin,setDiscoverBin,followingPosts,setFollowingPosts,
    usersSelfFollows,setUserDeets,userDeets,handleDeetsClick,setTargetUser,
    targetUser})
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
                <div className="header-title">Skratchr</div>
                <button onClick={logOut} className="btn-feed"><span>Sign Out</span></button>
                <button onClick={showActInfo} className="btn-feed"><span>Account Info</span></button>
                <button onClick={showPostImage} className="btn-feed"><span>Make Post</span></button>
                <div>
                    <FeedPosts user={user} userposts={userposts} setUserPosts={setUserPosts} 
                    discoverBin={discoverBin} followingPosts={followingPosts} 
                    setFollowingPosts={setFollowingPosts} usersSelfFollows={usersSelfFollows} setUserDeets={setUserDeets} 
                    userDeets={userDeets} handleDeetsClick={handleDeetsClick} setTargetUser={setTargetUser} targetUser={targetUser}/>
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