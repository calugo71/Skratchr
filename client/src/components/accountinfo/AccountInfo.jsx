import React, { useState } from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";
import './AccountInfo.css'

export default function AccountInfo({showActInfo,user,setUser, userposts,setUserPosts}){

    //handle delete account
    const handleDelete = (e) => {
        fetch("http://localhost:3000/delete_account",{
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('jwt'),
                'Content-Type': 'application/json',
            },
        })
        .then(localStorage.clear(), setUser({username: ""}))
    };
    //handle profile update functionality
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const handleShowForm = (e) => {
        setShowUpdateForm(prevState=>!prevState)
    }
    const [updateUser, setUpdateUser] = useState({
        username: '',
        password: '',
    });
    let updateInfo = (e) => {
        console.log(e.target.value);
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value,
        });
    };
    function handlePacth(e){
        e.preventDefault();
        console.log(updateUser)
        fetch("http://localhost:3000/update",{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('jwt')
            },
            body: JSON.stringify(updateUser),
        })
        .then(res=>res.json())
        .then(data=>setShowUpdateForm(prevState=>!prevState))
    }
    

    return (
        <>
            <div>Account Info</div>
            {showUpdateForm ? 
            <>
                <div className="overlay">
                    <button onClick={handleShowForm}>Go Back</button>
                    <div>Current User: {user.username}</div>
                    <form id='Sign-In-Form' onSubmit={handlePacth}>
                        <input onChange={updateInfo} name="username" type='text' placeholder='Username' className="field-divided"/>
                        <input onChange={updateInfo} name="password" type='password' placeholder='Password' className="field-divided"/>
                        <button type='submit'>Submit Info Change</button>
                    </form>
                </div>
            </>
            :
            null}
            <button onClick={showActInfo}>Back To Feed</button>
            <button onClick={handleDelete}>Delete your account {user.username}</button>
            <button onClick={handleShowForm}>Update your account details</button>
            <div>
                This is your page, {user.username}!
            </div>
            <div className='posts-container'>
                {userposts.map((post=><PostCardFromUser key={post.id} post={post} />)) }
            </div>
        </>
    )

};