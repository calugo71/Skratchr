import React, { useState,useEffect } from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";

export default function ProfileDetail({targetUser}){
    
    const [narrowedTargetPosts, setNarrowedTargetPosts] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/get_target_user_posts", {
            headers: {
                name: targetUser
            },
            })
            .then((res) => res.json())
            .then((data) => setNarrowedTargetPosts(data))
    }, [])



    return(
        <>
            <div className='posts-container'>Profile Deet</div>
            This is {targetUser}'s profile
            {narrowedTargetPosts.map((post=><PostCardFromUser key={post.id} post={post} />)) }
        </>
    )
}