import React, { useState,useEffect } from "react";
import './FeedPosts.css'
import PostCard from "../postcard/PostCard";
import DiscoverUsers from "../discoverusers/DiscoverUsers"


export default function FeedPosts({
    user,userposts,setUserPosts,discoverBin,
    followingPosts,setFollowingPosts,usersSelfFollows,
    setUserDeets,userDeets,handleDeetsClick,setTargetUser,
    targetUser}){

    const allPosts = userposts.concat(followingPosts)

    console.log('this is from feedpsosts',usersSelfFollows)

    return(
        <>
            <div>
                Discover New Users!
                {discoverBin.map(listuser=><DiscoverUsers ket={listuser.id} listuser={listuser} user={user} 
                setFollowingPosts={setFollowingPosts} usersSelfFollows={usersSelfFollows} setUserDeets={setUserDeets} 
                userDeets={userDeets} handleDeetsClick={handleDeetsClick} setTargetUser={setTargetUser} targetUser={targetUser}/>)}
            </div>
            {allPosts.map((post=><PostCard key={post.id} post={post} setFollowingPosts={setFollowingPosts} setUserPosts={setUserPosts} user={user} usersSelfFollows={usersSelfFollows} setUserDeets={setUserDeets} 
                userDeets={userDeets} handleDeetsClick={handleDeetsClick} setTargetUser={setTargetUser} targetUser={targetUser}/>)) }
        </>
    )
}