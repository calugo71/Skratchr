import React, { useState,useEffect } from "react";
import './FeedPosts.css'
import PostCard from "../postcard/PostCard";
import DiscoverUsers from "../discoverusers/DiscoverUsers"


export default function FeedPosts({user,userposts,setUserPosts,discoverBin,followingPosts,setFollowingPosts}){

    const allPosts = userposts.concat(followingPosts)

    return(
        <>
            <div className='posts-container'>Posts Container</div>
            <div>
                Discover New Users!
                {discoverBin.map(listuser=><DiscoverUsers ket={listuser.id} listuser={listuser} user={user} setFollowingPosts={setFollowingPosts}/>)}
            </div>
            {allPosts.map((post=><PostCard key={post.id} post={post} setFollowingPosts={setFollowingPosts} setUserPosts={setUserPosts} user={user}/>)) }
        </>
    )
}