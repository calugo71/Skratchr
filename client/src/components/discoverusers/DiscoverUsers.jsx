import React, {useState} from "react";

export default function DiscoverUsers({handleDeetsClick,userDeets,setUserDeets,
    listuser,user,setFollowingPosts,usersSelfFollows,setTargetUser,targetUser}){

    //Follow User functionality
    const [followUser, setFollowUser] = useState({
        username: listuser.username
    })
    const handleFollow = (e) => {
        setFollowUser({
            ...followUser,
            username: e.target.value
        })
        if (user.username !== followUser.username) {
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
            <div>
                <div name= 'username' value={listuser.username}>
                    <button className="btn-discover">{listuser.username}</button>
                    <button onClick={handleDeetsClick} value={listuser.username}>go to users page</button>
                    <button  onClick={handleFollow} value={listuser.username}>follow user</button>
                </div>
            </div>
        </>

    )
}