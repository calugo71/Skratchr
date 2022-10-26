import React, {useState} from "react";

export default function SignUp({handleSignUp,setUser,showSignUp}){

    //creates new user
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    });
    let createUser = (e) => {
        e.preventDefault();
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };
    function handlePost(e){
        e.preventDefault()
        fetch("http://localhost:3000/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(res=>res.json())
        .then((data) => {
            if(data["user"]){
                localStorage.setItem("jwt", data.token);
                setUser({
                    username: data.user.username
                });
            }else{
                alert(data["error"])
            }
        })
        handleSignUp();
    };

    return(
        <>
            <button onClick={handleSignUp}>Back To Sign In</button>
            <div id='sign-in-modal'>
                <div id='sign-in-container'>
                    <h1>Sign-Up</h1>
                    <form onSubmit={handlePost} id='Sign-In-Form'>
                        <button type='submit' className='btn'>Create Log In</button>
                        <input onChange={createUser} name="username" type='text' placeholder='Username' />
                        <input onChange={createUser} name="password" type='password' placeholder='Password'/>
                    </form>
                </div>
            </div>
        </>
    )
}