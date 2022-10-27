import React, { useState, useEffect } from "react";
import './PostCardFromUser.css'

export default function PostCardFromUser({post}){

        //establish commenter's name
        const [nameArr, setNameArr]=useState([])
        useEffect(() => {
                fetch("http://localhost:3000/users",{
                headers: {
                    token: localStorage.getItem('jwt'),
                    "Content-Type": "application/json"
                },
                })
                .then(res => res.json())
                .then(data =>
                    setNameArr(data))
        }, []);
        const getUserName = (int, nameArr) => {
            for (var i=0; i < nameArr.length; i++){
                if (nameArr[i].id === int) {
                    return nameArr[i].username;
                }
            }
        }

    return(
        <>
            <div className="posts-container-user">
                <div className="container">	
                    <div className="product-details">
                        <h1>{post.title}</h1>
                        {post.comments.map(comment=><p className="information">{getUserName(comment.user_id, nameArr)} -{comment.text}</p>)}
                        <div className="control">
                            <button className="btn" name="post_id" value={post.id}  id="identifier">
                                <span className="buy"> {post.likes.length} Likes</span>
                            </button>
                        </div>
                    </div>
                    <div className="product-image" style={{backgroundImage: `url(${post.image})`, backgroundPosition: 'center center no-repeat', backgroundSize: 'cover'}}>
                    </div>
                </div>
            </div>
        </> 
    )
}