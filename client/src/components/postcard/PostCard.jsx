import React, {useState} from "react";
import { useEffect } from "react";
import HeartSpan from "./heartspan/HeartSpan";
import './PostCard.css'

export default function PostCard({post,setUserPosts,setFollowingPosts,
    user,targetUser,setTargetUser,
    handleDeetsClick,userDeets,setUserDeets}){

    //set comment object and handle POST for said comment object
    const [comObj, setComObj] = useState({
        text: '',
        post_id: '',
    })
    const setObj = (e) => {
        setComObj({
            ...comObj,
            [e.target.name]: e.target.value
        })
        
    }
    const handleCommentPost = (e) => {
        e.preventDefault(); 
        fetch("http://localhost:3000/add_comment",{
            method: 'POST',
            headers: {
                token: localStorage.getItem('jwt'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comObj),
        })
        .then(res=>res.json())
        .then(promise=>{
            let token = localStorage.getItem("jwt");
            fetch("http://localhost:3000/user_posts", {
                headers: {
                token: token,
                "Content-Type": "application/json",
            },
            })
            .then(res => res.json())
            .then (data => setUserPosts(data));
            fetch("http://localhost:3000/followings_posts", {
                headers: {
                token: token,
                "Content-Type": "application/json",
            },
            })
            .then(res => res.json())
            .then (data => setFollowingPosts(data));    
        })
    }
    //Like and unlike photo
    const [heartBeat, setHeartBeat] = useState(false)
    const handleLike = (e) => {
        if (heartBeat===false) {
                const likeObj = {
                post_id: e.currentTarget.value
            }
            fetch("http://localhost:3000/like_picture",{
                method: 'POST',
                headers: {
                    token: localStorage.getItem('jwt'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likeObj),
            })
            .then(res=>res.json())
            .then(promise=>{
                let token = localStorage.getItem("jwt");
                fetch("http://localhost:3000/user_posts", {
                    headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                })
                .then(res => res.json())
                .then (data => setUserPosts(data));
                fetch("http://localhost:3000/followings_posts", {
                    headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                })
                .then(res => res.json())
                .then (data => setFollowingPosts(data));    
            })
        }else{
            const likeObj = {
                post_id: e.currentTarget.value
            }
            fetch("http://localhost:3000/unlike_picture",{
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('jwt'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likeObj),
            })
            .then(promise=>{
                let token = localStorage.getItem("jwt");
                setHeartBeat(false);
                fetch("http://localhost:3000/user_posts", {
                    headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                })
                .then(res => res.json())
                .then (data => setUserPosts(data));
                fetch("http://localhost:3000/followings_posts", {
                    headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
                })
                .then(res => res.json())
                .then (data => setFollowingPosts(data)); 
            })
        }
    }
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
            <div className="container">	
                <div className="product-details">
                    <h1>{post.title}</h1>
                    {post.comments.map(comment=><p className="information">{getUserName(comment.user_id, nameArr)} -{comment.text}</p>)}
                    <div className="control">
                        <button className="btn" name="post_id" value={post.id} onClick={handleLike} id="identifier">
                            <span className="price">{post.likes.length}</span>
                            <HeartSpan user={user} likes={post.likes} heartBeat={heartBeat} setHeartBeat={setHeartBeat}/>
                        </button>
                        <form onSubmit={handleCommentPost}>
                            <input placeholder="Comment..." name="text" type="text" onChange={setObj}></input>
                            <button name="post_id" value={post.id} onClick={setObj}>💬</button>
                        </form>
                    </div>
                </div>
                <div className="product-image" style={{backgroundImage: `url(${post.image})`, backgroundPosition: 'center center no-repeat', backgroundSize: 'cover'}}>
                    <div className="info">
                        <h2>Post by</h2>
                            <button value={post.user.username} onClick={handleDeetsClick}>{post.user.username}</button>
                    </div>
                </div>
            </div>
        </>
    )
}