import React, { useState,useEffect } from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";

export default function ProfileDetail({targetUser,setFollowingPosts,user}){
    
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

        //Follow User functionality
        const [followUser, setFollowUser] = useState({
            username: targetUser
        })
        const handleFollow = (e) => {
            setFollowUser({
                ...followUser,
                username: e.target.value
            })
            if (user.username !== targetUser) {
                fetch("http://localhost:3000/add_follow",{
                method: 'POST',
                headers: {
                    token: localStorage.getItem("jwt"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(followUser),
                })
                .then(res=>res.json())
                .then(promise=>{
                    let token = localStorage.getItem("jwt");
                    fetch("http://localhost:3000/followings_posts", {
                    headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                })
                .then(res => res.json())
                .then (data => setFollowingPosts(data));
                })}
            else {
                alert("Whaaaaaat are you doing there, buddy?")
            }
        }

    return(
        <>
            <div className='posts-container' value={targetUser}>Profile Deet</div>
            This is {targetUser}'s profile
            <button value={targetUser} onClick={handleFollow}>Follow {targetUser}</button>
            {narrowedTargetPosts.map((post=><PostCardFromUser key={post.id} post={post} />)) }

        </>
    )
}