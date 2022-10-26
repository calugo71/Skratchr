import React from "react";
import './PostCardFromUser.css'

export default function PostCardFromUser({post}){
    console.log(post)
    return(
        <>
            <div className="container">	
                <div className="product-details">
                    <h1>{post.title}</h1>
                    {post.comments.map(comment=><p className="information">{comment.user_id} -{comment.text}</p>)}
                    <div className="control">
                        <button className="btn" name="post_id" value={post.id}id="identifier">
                            <span className="price">{post.likes.length}</span>
                            <span className="buy">Likes</span>
                        </button>
                    </div>
                </div>
                <div className="product-image" style={{backgroundImage: `url(${post.image})`, backgroundPosition: 'center center no-repeat', backgroundSize: 'cover'}}>
                    <div className="info">
                        <h2>Post by</h2>
                            <button>{post.user.username}</button>
                    </div>
                </div>
            </div>
        </> 
    )
}