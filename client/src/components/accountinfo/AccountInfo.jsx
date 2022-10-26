import React from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";

export default function AccountInfo({showActInfo,user,setUser, userposts,setUserPosts}){

    return (
        <>
            <div>Account Info</div>
            <button onClick={showActInfo}>Back To Feed</button>
            <button>Delete your account {user.username}</button>
            <div>
                This is your page, {user.username}!
            </div>
            <div className='posts-container'>
                {userposts.map((post=><PostCardFromUser key={post.id} post={post} />)) }
            </div>
        </>
    )

};