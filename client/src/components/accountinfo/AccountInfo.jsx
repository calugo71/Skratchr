import React from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";

export default function AccountInfo({showActInfo,user,setUser, userposts,setUserPosts}){

    return (
        <>
            <div>Account Info</div>
            <button onClick={showActInfo}>Back To Feed</button>
            <button>Delete your account {user.username}</button>
            <div className='posts-container'>Posts Container
                {userposts.map((post=><PostCardFromUser key={post.id} post={post} />)) }
            </div>
        </>
    )

};